def calculate_gain(buy_price, sell_price, shares):
  cost = buy_price * shares
  revenue = sell_price * shares
  gain = revenue - cost
  return gain

def compare_gains(buy_price, sell_price_low, sell_price_high, shares):
  gain_low = calculate_gain(buy_price, sell_price_low, shares)
  gain_high = calculate_gain(buy_price, sell_price_high, shares)
  return gain_low, gain_high

# Usage
buy_price = float(input("Enter the buying price per share: "))
sell_price_low = float(input("Enter the lower selling price per share: "))
sell_price_high = float(input("Enter the higher selling price per share: "))
shares = int(input("Enter the number of shares: "))

gain_low, gain_high = compare_gains(buy_price, sell_price_low, sell_price_high, shares)
gain_low = round(gain_low, 2)
gain_high = round(gain_high, 2)
print(f"The gain from selling the stock at the lower price is ${format(gain_low, '.2f')}")
print(f"The gain from selling the stock at the higher price is ${format(gain_high, '.2f')}")
print(f"The difference in gain is ${format(gain_high - gain_low, '.2f')}");300