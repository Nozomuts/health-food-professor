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
from recommend import recommend
from find import find


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

        eiyou_data,xs,status,cal_key = find(problem,data,MenuDict,target_menu_list,one_da_nutrition_dict)

        print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。
        if pulp.LpStatus[status] == "Optimal":


            # 簡易結果表示
            # print([x.value() for x in xs])
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

            rec_problem = pulp.LpProblem(name ="1日の栄養素を満たす追加のメニュー", sense = pulp.LpMinimize)
            recommend_menu_list,one_da_nutrition_dict = recommend(MenuDict,target_menu_list,one_da_nutrition_dict,eiyou_data)
            if not recommend_menu_list:
                print("残念ながら選択されたお店では一日の栄養素を満たすものはないようです")
                exit()
            eiyou_data,xs,re_status,cal_key = find(rec_problem,data,MenuDict,recommend_menu_list,one_da_nutrition_dict)
            #　変数名ごとに表示
            if pulp.LpStatus[re_status] == "Optimal":
                rec_menu={}
                print("追加でこんなメニューはどうですか")
                for x in xs:
                    if int(x.value()) != 0:
                        #print("x.value:",x.value)
                        print(str(x),":",str(int(x.value())),"個")
                        rec_menu[str(x)] = str(int(x.value()))+"個"
                response=[rec_menu]
                return make_response(jsonify(response))

            else:
                print("もう一度メニューを考え直してみよう")
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
