
# High-accuracy strategy for Options (Nifty & Bank Nifty)
# Using Supertrend + RSI + VWAP for directional bias
# Assumes Dhan API is available for instrument lookup and order placement

def generate_index_signal(index_data):
    """
    index_data: dict with keys ['ltp', 'supertrend', 'rsi', 'vwap']
    """
    ltp = index_data['ltp']
    supertrend = index_data['supertrend']
    rsi = index_data['rsi']
    vwap = index_data['vwap']
    
    if supertrend == 'BUY' and rsi > 55 and ltp > vwap:
        return 'BULLISH'
    elif supertrend == 'SELL' and rsi < 45 and ltp < vwap:
        return 'BEARISH'
    else:
        return 'NEUTRAL'

def get_option_symbol(index_name, ltp):
    """
    Return ATM option symbol for current expiry
    Example return: 'BANKNIFTY2451656000CE'
    """
    # Placeholder logic to return formatted string
    strike = int(round(ltp / 100) * 100)
    expiry = '24516'  # This would be dynamically generated based on today
    if index_name == 'BANKNIFTY':
        return {
            'CE': f'BANKNIFTY{expiry}{strike}CE',
            'PE': f'BANKNIFTY{expiry}{strike}PE'
        }
    else:
        return {
            'CE': f'NIFTY{expiry}{strike}CE',
            'PE': f'NIFTY{expiry}{strike}PE'
        }

def generate_option_signal(index_name, index_data):
    trend = generate_index_signal(index_data)
    option_symbols = get_option_symbol(index_name, index_data['ltp'])
    if trend == 'BULLISH':
        return {'signal': 'BUY', 'symbol': option_symbols['CE']}
    elif trend == 'BEARISH':
        return {'signal': 'BUY', 'symbol': option_symbols['PE']}
    else:
        return {'signal': 'HOLD', 'symbol': None}
