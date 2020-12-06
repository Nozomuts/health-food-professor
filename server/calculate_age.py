#これは使わなくなった。
from datetime import date

# 年齢と性別を表示して。
def calculate_age(year, month, day):
    """年齢を返す"""
    born = date(year, month, day)  # あなたの誕生日
    today = date.today()  # 今日

    age = today.year - born.year

    # 今年の誕生日を迎えていなければ、ageを1つ減らす
    # 今日を表すタプル(7, 29) < 誕生日を表すタプル(7, 30)
    if (today.month, today.day) < (born.month, born.day):
        age -= 1
    return age
