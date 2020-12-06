import pulp

# 上限をupBoundで指定
def up_limit(target_menu_list,value):
    xs = [pulp.LpVariable('{}'.format(x), cat = 'Integer', lowBound = 0,upBound = value) for x in target_menu_list]
    return xs
