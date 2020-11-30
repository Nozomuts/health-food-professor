import csv
import os
# リクエスト送信後に受け取った店舗のメニューを辞書型で格納する。
def menu_dict(shop):
    MenuDict = {}
    for name in shop:
        # data["menu"]でメニューで選択されたメニューを読み込む
        with open(os.getcwd()+'/nutrition_data/'+name+'.csv',encoding='cp932') as f:
            reader = csv.DictReader(f)
            # OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174'), ・・・が１行ごとに入っている
            # ※ジュース系などで、栄養価が「-」のものは０を置換済み
            for row in reader:
                # 'えびフィレオ' : OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174')・・・ の辞書形式に加工
                MenuDict[row["商品名"]] = row

    return MenuDict
