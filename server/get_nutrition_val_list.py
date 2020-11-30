# 特定の栄養価リストを取得する
# 対象のtarget_menu_listに入っている順番に、栄養価の値を取得
def get_nutrition_val_list(nutrition_dict, target_menu_list, eiyou_name):
    result_list = []
    for menu_name in target_menu_list:
        if eiyou_name in nutrition_dict[menu_name]:
        #　栄養価を取得してfloatに変換
            eiyou_val = nutrition_dict[menu_name][eiyou_name]
            result_list.append(float(eiyou_val))
    return result_list
    
