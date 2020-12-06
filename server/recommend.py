# recommend menu system
def recommend(MenuDict,target_menu_list,one_da_nutrition_dict,eiyou_data):
    # 選択されたメニュー以外で考える
    recommend_menu_list = list(MenuDict.keys())
    recommend_menu_list = list(set(recommend_menu_list) - set(target_menu_list))
    #print(recommend_menu_list)

    #print(one_da_nutrition_dict)
    # 選択されたメニューを必ず一個含むようにするために、栄養素からあらかじめ一個分を引いておく。
    for key in eiyou_data.keys():
        for eiyou_value in eiyou_data[key]:
            one_da_nutrition_dict[key] = round(float(one_da_nutrition_dict[key]) - float(eiyou_value),1)

    #print(one_da_nutrition_dict)
    return recommend_menu_list,one_da_nutrition_dict
