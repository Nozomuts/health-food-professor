from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
import csv
import pulp
import os
# 関数呼び出し
from get_nutrition_val_list import get_nutrition_val_list
from old_one_da_nutrition_dict import old_one_da_nutrition_dict
from up_limit import up_limit
from menu_dict import menu_dict


# flaskの設定
# Flaskオブジェクトの生成
# static_folderは静的ライブラリの指定　
app = Flask(__name__, static_folder="./build/static",
            template_folder="./build")

CORS(app)  # Cross Origin Resource Sharing


@app.route('/api/check', methods=["POST"])
def index():
    # error構文を追加　もしGETが正常じゃないとき
    try:
        # 問題の定義　最小化か最大化か　
        # 今回はカロリーを最小化したい。
        problem = pulp.LpProblem(name="1日の栄養素を満たすメニュー", sense=pulp.LpMinimize)


        # 店をどこを選択したかをデータで受け取り、csvのどれを読み込むかを決める。
        data = request.get_json()["data"]
        print("data:",data)
        # ここで店の名前を["dennys","macdonalds"]のようにリストとして受け取って欲しい。
        MenuDict = menu_dict(data["shop"])

        # メニューリストをcsvから自動取得
        # data["menu"]から選択されたメニューを受け取る
        # data["menu"]が空の場合は全メニュー選ぶ
        #　このメニューもリストとして返して欲しい

        if not data["menu"]:
            target_menu_list = list(MenuDict.keys())
        else:
            target_menu_list = data["menu"]


        gender = int(data["gender"])
        old = int(data["old"])
        up_value = int(data["up_value"])
        # print("gender:",gender,"old:",old)
        #gender,old = map(int,input().split())
        one_da_nutrition_dict = old_one_da_nutrition_dict(gender, old)
        # print("one_da_nutrition_dict:",one_da_nutrition_dict)

        # 対象とする栄養素について、対象の商品リストごとの栄養価を、リスト形式で作成する
        eiyou_data = {}
        for key in one_da_nutrition_dict.keys():
            # keyに入っている栄養の名称を、データのdictのkeyにする。
            eiyou_data[key] = get_nutrition_val_list(
                MenuDict, target_menu_list, key)

        # 変数の定義
        # LpVariableで自由辺巣を作成。値は-∞から∞まで
        # lowBoundで0から∞まで
        # catで変数の種類指定
        # 商品の上限指定　
        #print("up_value:", up_value)
        xs = up_limit(target_menu_list, up_value)

        # 目的関数：カロリーを最小化
        # lpdot:二つのリストのない席を求める。
        problem += pulp.lpDot(eiyou_data["エネルギー[kcal]"], xs)

        # 制約条件：　一日に必要内容量をそれぞれ満たすこと
        # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
        # 食塩相当については、「以内」としている。解が存在スカは要注意
        for key in eiyou_data.keys():
            # 食塩は以下なので別個でやる
            if key == "食塩相当量[g]":
                continue
            # メニューの数と栄養素のデータの数が一致しないときは計算しない。
            if len(eiyou_data[key]) == len(target_menu_list):
                #print("eiyou_data[key]",len(eiyou_data[key]),len(target_menu_list))
                problem += pulp.lpDot(eiyou_data[key], xs) >= float(one_da_nutrition_dict[key])

        problem += pulp.lpDot(eiyou_data["食塩相当量[g]"], xs) <= float(one_da_nutrition_dict["食塩相当量[g]"])

        # 与えられた問題の内容を表示
        # print(problem)
        status = problem.solve()
        print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。
        if pulp.LpStatus[status] == "Optimal":


            # 簡易結果表示
            #print([x.value() for x in xs])
            # print(problem.objective.value())

            #　変数名ごとに表示
            one_da_neces_nutrition = {}
            for x in xs:
                # print(str(x),":",str(int(x.value())),"個")
                one_da_neces_nutrition[str(x)] = str(int(x.value()))+"個"

            # それぞれの栄養素がいくらか
            # nutrition_comp 一日に必要な栄養素の比較
            nutrition_comp = {}
            for key in one_da_nutrition_dict:
                if str(round(pulp.lpDot(eiyou_data[key], xs).value())) != 0:
                    print(key, ":", str(one_da_nutrition_dict[key]), "に対し", str(
                        round(pulp.lpDot(eiyou_data[key], xs).value())))
                    nutrition_comp[key] = str(
                        one_da_nutrition_dict[key])+"に対し"+str(round(pulp.lpDot(eiyou_data[key], xs).value()))

            response = [one_da_neces_nutrition, nutrition_comp]
            return make_response(jsonify(response))
        # 条件にあった解が見つからなかった時はerrorを返す
        else:
            response = 'error'
            return make_response(jsonify(response))
    except:
        return"""
            ERROR !!!
            """


# python main.pyで実行されたときだけ動くようにする。
if __name__ == "__main__":		# importされると"__main__"は入らないので，実行かimportかを判断できる．
    app.debug = True
    app.run(host='localhost', port=5000)
