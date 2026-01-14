-- Insert Sample Data from mockData.ts
-- This file contains INSERT statements for all brokers/exchanges/prop firms

USE review_agency;

-- Clear existing data (optional - uncomment if needed)
-- DELETE FROM reviews;

-- Forex Brokers
INSERT INTO reviews (review_type, name, slug, rating, reviews, description, url_site, logo, logo_bg, tags, stats, terms, key_info, content, pros, cons, average_rating, rating_breakdown, advantages, disadvantages) VALUES
('forex', 'Binance', 'binance', 5.00, 25000, 'Binance is the world\'s largest crypto exchange by trading volume. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.', NULL, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Yts5TU2eZMfPcCJaorDJ7a0L2f9AWHfDVkU1ArIfgilQ8wAO4YU2ExTcfI_84-aP4tzfqhqUngra5Te7EuKF7HBV6VqILbpXKUjjA9QGEqXGWqCpnz1nft0YKmV8gEC-kDS6SJrofw5PoVJrn4-AJjfWm_junml8oYcgV_XwA3ZTq9lhfrRySl5B4ex8ipx1UI957p-APWD_nkc_wOXtrE_i33E2jmojqgoOiRxjW3T-zEm-MvQqonT61oyL3-DLrRFCyPoVDhk', 'bg-black', 
JSON_ARRAY('Forex Trading', 'Verified', 'Global'), 
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Min Deposit', 'value', '$100 - $600,000'),
  JSON_OBJECT('icon', 'percent', 'title', 'Effective Interest', 'value', 'From 6.90 - 24.40%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Running Time', 'value', '1.5 Years'),
  JSON_OBJECT('icon', 'person', 'title', 'My Age', 'value', '25 Years'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Max Funding', 'value', '$120,000')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Loan Amount:', 'value', '$100 - $600,000'),
  JSON_OBJECT('label', 'Repayment Period:', 'value', '1 - 18 years'),
  JSON_OBJECT('label', 'Effective Interest:', 'value', '8.01 - 24.4%'),
  JSON_OBJECT('label', 'Age Limit:', 'value', '21 - 75')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Effective Interest from:', 'value', '8.01%'),
  JSON_OBJECT('label', 'Minimum Loan Amount:', 'value', '10,000'),
  JSON_OBJECT('label', 'Maximum Loan Amount:', 'value', '600,000'),
  JSON_OBJECT('label', 'Maturity:', 'value', '18 years')
),
'<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.</p>\n\n<h3>Low Spreads</h3>\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>\n\n<h3>Fast Execution</h3>\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>\n\n<h3>Multiple Platforms</h3>\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>\n\n<h3>Regulation</h3>\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>',
JSON_ARRAY('Competitive Interest Rates', 'Flexible Repayment Options', 'Quick Approval and Disbursement', 'No Collateral Required', 'Favorable Terms and Conditions'),
JSON_ARRAY('Higher Interest Rates', 'Strict Eligibility Criteria', 'Prepayment Penalties', 'Fees and Charges', 'Potential Impact on Credit'),
4.90,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '85%'),
  JSON_OBJECT('stars', 4, 'pct', '60%'),
  JSON_OBJECT('stars', 3, 'pct', '15%'),
  JSON_OBJECT('stars', 2, 'pct', '5%'),
  JSON_OBJECT('stars', 1, 'pct', '8%')
),
JSON_ARRAY('Flexible account types', 'Advanced Trading Platform', 'Diverse technical research tools', 'Under multiple supervision', 'Very fast order execution'),
JSON_ARRAY('No third party social trading tools', 'Stock CFDs are expensive', 'Desktop platform is not friendly enough')
),
('forex', 'Bitstamp', 'bitstamp', 4.50, 25000, 'Bitstamp is one of the longest-running cryptocurrency exchanges, known for its security and reliability. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.', NULL, NULL, 'bg-[#064234]',
JSON_ARRAY('Crypto Exchange', 'Verified', 'European'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Min Deposit', 'value', '$50 - $500,000'),
  JSON_OBJECT('icon', 'percent', 'title', 'Trading Fees', 'value', '0.25% - 0.50%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2011'),
  JSON_OBJECT('icon', 'security', 'title', 'Security', 'value', 'High'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Max Funding', 'value', '$500,000')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Trading Fees:', 'value', '0.25% - 0.50%'),
  JSON_OBJECT('label', 'Deposit Methods:', 'value', 'Bank, Card, Crypto'),
  JSON_OBJECT('label', 'Withdrawal Time:', 'value', '1-3 business days'),
  JSON_OBJECT('label', 'Supported Countries:', 'value', '100+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Deposit:', 'value', '$50'),
  JSON_OBJECT('label', 'Maximum Deposit:', 'value', '$500,000'),
  JSON_OBJECT('label', 'Trading Pairs:', 'value', '50+'),
  JSON_OBJECT('label', 'Regulation:', 'value', 'EU Licensed')
),
'<p>Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.</p>\n\n<h3>Security</h3>\n<p>Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits.</p>\n\n<h3>Regulation</h3>\n<p>As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind.</p>\n\n<h3>Trading Platform</h3>\n<p>The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management.</p>\n\n<h3>Customer Support</h3>\n<p>Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently.</p>',
JSON_ARRAY('Long-established and trusted', 'Strong security measures', 'Regulatory compliance', 'User-friendly interface', 'Good customer support'),
JSON_ARRAY('Limited cryptocurrency selection', 'Higher fees than some competitors', 'Slower withdrawal times', 'Limited advanced trading features'),
4.50,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '70%'),
  JSON_OBJECT('stars', 4, 'pct', '20%'),
  JSON_OBJECT('stars', 3, 'pct', '5%'),
  JSON_OBJECT('stars', 2, 'pct', '3%'),
  JSON_OBJECT('stars', 1, 'pct', '2%')
),
JSON_ARRAY('Regulated and licensed', 'Strong security measures', 'User-friendly platform', 'Good customer support', 'Long track record'),
JSON_ARRAY('Limited cryptocurrency selection', 'Higher trading fees', 'Slower withdrawal processing')
),
('forex', 'RoboForex', 'roboforex', 5.00, 25000, 'RoboForex is known for its innovative tools, multiple account types, and attractive bonuses for traders of all levels. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#001D5F]',
JSON_ARRAY('Forex Broker', 'Verified', 'Global'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Min Deposit', 'value', '$10 - $1,000,000'),
  JSON_OBJECT('icon', 'percent', 'title', 'Spread', 'value', 'From 0.0 pips'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2009'),
  JSON_OBJECT('icon', 'trending_up', 'title', 'Leverage', 'value', 'Up to 1:2000'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Max Funding', 'value', '$1,000,000')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Deposit:', 'value', '$10'),
  JSON_OBJECT('label', 'Maximum Leverage:', 'value', '1:2000'),
  JSON_OBJECT('label', 'Spread:', 'value', 'From 0.0 pips'),
  JSON_OBJECT('label', 'Account Types:', 'value', '5 types')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Trading Instruments:', 'value', '12,000+'),
  JSON_OBJECT('label', 'Platforms:', 'value', 'MT4, MT5, cTrader'),
  JSON_OBJECT('label', 'Regulation:', 'value', 'CySEC, IFSC'),
  JSON_OBJECT('label', 'Bonus:', 'value', 'Up to 120%')
),
'<p>RoboForex has been serving traders since 2009, offering a comprehensive trading experience with multiple account types, advanced platforms, and a wide range of trading instruments. The broker is known for its competitive spreads, high leverage options, and generous bonus programs that cater to traders of all experience levels.</p>\n\n<h3>Account Types</h3>\n<p>RoboForex offers five different account types to suit various trading styles and experience levels, from beginner-friendly options to advanced ECN accounts.</p>\n\n<h3>Trading Platforms</h3>\n<p>Traders can choose from industry-leading platforms including MetaTrader 4, MetaTrader 5, and cTrader, each offering unique features and tools.</p>\n\n<h3>Trading Instruments</h3>\n<p>Access to over 12,000 trading instruments including forex pairs, stocks, indices, commodities, and cryptocurrencies.</p>\n\n<h3>Bonus Programs</h3>\n<p>RoboForex offers various bonus programs including welcome bonuses, deposit bonuses, and cashback programs to enhance trading opportunities.</p>',
JSON_ARRAY('Low minimum deposit', 'High leverage options', 'Multiple trading platforms', 'Wide range of instruments', 'Attractive bonus programs'),
JSON_ARRAY('Complex fee structure', 'Limited educational resources', 'Customer support varies by region'),
4.80,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '80%'),
  JSON_OBJECT('stars', 4, 'pct', '15%'),
  JSON_OBJECT('stars', 3, 'pct', '3%'),
  JSON_OBJECT('stars', 2, 'pct', '1%'),
  JSON_OBJECT('stars', 1, 'pct', '1%')
),
JSON_ARRAY('Low minimum deposit', 'High leverage available', 'Multiple platform options', 'Wide instrument selection', 'Generous bonuses'),
JSON_ARRAY('Complex fee structure', 'Limited educational content', 'Regional support differences')
);

-- Crypto Exchanges
INSERT INTO reviews (review_type, name, slug, rating, reviews, description, url_site, logo, logo_bg, tags, stats, terms, key_info, content, pros, cons, average_rating, rating_breakdown, advantages, disadvantages) VALUES
('crypto', 'Binance', 'binance-crypto', 5.00, 25000, 'Binance is the world\'s largest cryptocurrency exchange by trading volume. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.', NULL, 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Yts5TU2eZMfPcCJaorDJ7a0L2f9AWHfDVkU1ArIfgilQ8wAO4YU2ExTcfI_84-aP4tzfqhqUngra5Te7EuKF7HBV6VqILbpXKUjjA9QGEqXGWqCpnz1nft0YKmV8gEC-kDS6SJrofw5PoVJrn4-AJjfWm_junml8oYcgV_XwA3ZTq9lhfrRySl5B4ex8ipx1UI957p-APWD_nkc_wOXtrE_i33E2jmojqgoOiRxjW3T-zEm-MvQqonT61oyL3-DLrRFCyPoVDhk', 'bg-black',
JSON_ARRAY('Centralized Exchange', 'Verified', 'Global'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Trading Fees', 'value', '0.1% - 0.02%'),
  JSON_OBJECT('icon', 'percent', 'title', 'BNB Discount', 'value', '25% off fees'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2017'),
  JSON_OBJECT('icon', 'trending_up', 'title', 'Trading Pairs', 'value', '600+'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Daily Volume', 'value', '$10B+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Trading Fees:', 'value', '0.1% - 0.02%'),
  JSON_OBJECT('label', 'Withdrawal Fees:', 'value', 'Varies by coin'),
  JSON_OBJECT('label', 'Minimum Trade:', 'value', '0.001 BTC'),
  JSON_OBJECT('label', 'Supported Coins:', 'value', '600+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Spot Trading:', 'value', 'Available'),
  JSON_OBJECT('label', 'Futures Trading:', 'value', 'Available'),
  JSON_OBJECT('label', 'Staking:', 'value', 'Available'),
  JSON_OBJECT('label', 'NFT Marketplace:', 'value', 'Available')
),
'<p>Binance is the world\'s largest cryptocurrency exchange by trading volume, serving millions of users worldwide. The platform offers a comprehensive suite of trading services including spot trading, futures, margin trading, staking, and more. With over 600 trading pairs and advanced trading tools, Binance caters to both beginners and professional traders.</p>\n\n<h3>Spot Trading</h3>\n<p>Binance offers one of the largest selections of cryptocurrency trading pairs with competitive fees and high liquidity for optimal trading execution.</p>\n\n<h3>Futures Trading</h3>\n<p>Advanced futures trading platform with up to 125x leverage, allowing traders to profit from both rising and falling markets.</p>\n\n<h3>Staking</h3>\n<p>Earn passive income by staking various cryptocurrencies directly on the Binance platform with flexible and locked staking options.</p>\n\n<h3>Security</h3>\n<p>Binance employs industry-leading security measures including SAFU fund, two-factor authentication, and cold storage for user funds.</p>',
JSON_ARRAY('Largest trading volume', 'Low trading fees', 'Wide selection of coins', 'Advanced trading features', 'BNB fee discount'),
JSON_ARRAY('Complex interface for beginners', 'Regulatory concerns in some regions', 'Customer support can be slow'),
4.90,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '85%'),
  JSON_OBJECT('stars', 4, 'pct', '10%'),
  JSON_OBJECT('stars', 3, 'pct', '3%'),
  JSON_OBJECT('stars', 2, 'pct', '1%'),
  JSON_OBJECT('stars', 1, 'pct', '1%')
),
JSON_ARRAY('Largest trading volume', 'Low fees with BNB discount', 'Wide coin selection', 'Advanced trading tools', 'Mobile app available'),
JSON_ARRAY('Complex for beginners', 'Regulatory issues', 'Slow customer support')
),
('crypto', 'Bitstamp', 'bitstamp-crypto', 4.50, 25000, 'Bitstamp is one of the longest-running cryptocurrency exchanges, known for its security and reliability. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#064234]',
JSON_ARRAY('Centralized Exchange', 'Verified', 'European'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Trading Fees', 'value', '0.25% - 0.50%'),
  JSON_OBJECT('icon', 'percent', 'title', 'Volume Discount', 'value', 'Up to 0.1%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2011'),
  JSON_OBJECT('icon', 'security', 'title', 'Security', 'value', 'High'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Daily Volume', 'value', '$100M+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Trading Fees:', 'value', '0.25% - 0.50%'),
  JSON_OBJECT('label', 'Deposit Methods:', 'value', 'Bank, Card, Crypto'),
  JSON_OBJECT('label', 'Withdrawal Time:', 'value', '1-3 business days'),
  JSON_OBJECT('label', 'Supported Countries:', 'value', '100+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Deposit:', 'value', '$50'),
  JSON_OBJECT('label', 'Trading Pairs:', 'value', '50+'),
  JSON_OBJECT('label', 'Regulation:', 'value', 'EU Licensed'),
  JSON_OBJECT('label', 'Security:', 'value', 'Cold Storage')
),
'<p>Bitstamp has been operating since 2011, making it one of the oldest cryptocurrency exchanges in the world. The platform is known for its strong security measures, regulatory compliance, and user-friendly interface. It serves customers in over 100 countries and has built a reputation for reliability and trustworthiness in the crypto space.</p>\n\n<h3>Security</h3>\n<p>Bitstamp employs industry-leading security measures including cold storage for the majority of funds, two-factor authentication, and regular security audits.</p>\n\n<h3>Regulation</h3>\n<p>As a licensed exchange in the EU, Bitstamp adheres to strict regulatory standards, providing users with additional protection and peace of mind.</p>\n\n<h3>Trading Platform</h3>\n<p>The platform offers a clean, intuitive interface suitable for both beginners and experienced traders, with real-time charts and order management.</p>\n\n<h3>Customer Support</h3>\n<p>Bitstamp provides responsive customer support through multiple channels, helping users resolve issues quickly and efficiently.</p>',
JSON_ARRAY('Long-established and trusted', 'Strong security measures', 'Regulatory compliance', 'User-friendly interface', 'Good customer support'),
JSON_ARRAY('Limited cryptocurrency selection', 'Higher fees than some competitors', 'Slower withdrawal times', 'Limited advanced trading features'),
4.50,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '70%'),
  JSON_OBJECT('stars', 4, 'pct', '20%'),
  JSON_OBJECT('stars', 3, 'pct', '5%'),
  JSON_OBJECT('stars', 2, 'pct', '3%'),
  JSON_OBJECT('stars', 1, 'pct', '2%')
),
JSON_ARRAY('Regulated and licensed', 'Strong security measures', 'User-friendly platform', 'Good customer support', 'Long track record'),
JSON_ARRAY('Limited cryptocurrency selection', 'Higher trading fees', 'Slower withdrawal processing')
),
('crypto', 'Coinbase', 'coinbase', 5.00, 25000, 'Coinbase is known for its user-friendly interface, secure platform, and wide range of supported cryptocurrencies. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#0052FF]',
JSON_ARRAY('Centralized Exchange', 'Verified', 'US Licensed'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Trading Fees', 'value', '0.50% - 1.50%'),
  JSON_OBJECT('icon', 'percent', 'title', 'Coinbase Pro', 'value', '0.00% - 0.50%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2012'),
  JSON_OBJECT('icon', 'security', 'title', 'Insurance', 'value', 'FDIC Insured'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Daily Volume', 'value', '$2B+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Trading Fees:', 'value', '0.50% - 1.50%'),
  JSON_OBJECT('label', 'Deposit Methods:', 'value', 'Bank, Card, Wire'),
  JSON_OBJECT('label', 'Withdrawal Time:', 'value', '1-5 business days'),
  JSON_OBJECT('label', 'Supported Coins:', 'value', '200+')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Deposit:', 'value', '$2'),
  JSON_OBJECT('label', 'Trading Pairs:', 'value', '200+'),
  JSON_OBJECT('label', 'Regulation:', 'value', 'US Licensed'),
  JSON_OBJECT('label', 'Insurance:', 'value', 'FDIC Insured')
),
'<p>Coinbase is one of the most trusted cryptocurrency exchanges in the United States, known for its user-friendly interface and strong regulatory compliance. The platform makes it easy for beginners to buy, sell, and store cryptocurrencies while also offering advanced trading features through Coinbase Pro for experienced traders.</p>\n\n<h3>User-Friendly Interface</h3>\n<p>Coinbase\'s intuitive interface makes it easy for beginners to buy, sell, and manage their cryptocurrency portfolio with just a few clicks.</p>\n\n<h3>Security</h3>\n<p>Coinbase stores 98% of customer funds in cold storage and provides FDIC insurance for USD balances, offering peace of mind to users.</p>\n\n<h3>Coinbase Pro</h3>\n<p>Advanced traders can use Coinbase Pro for lower fees and more sophisticated trading tools while maintaining access to the same secure infrastructure.</p>\n\n<h3>Educational Resources</h3>\n<p>Coinbase offers extensive educational content through Coinbase Earn, helping users learn about cryptocurrencies while earning rewards.</p>',
JSON_ARRAY('User-friendly interface', 'Strong regulatory compliance', 'FDIC insurance', 'Wide coin selection', 'Excellent mobile app'),
JSON_ARRAY('Higher fees than competitors', 'Limited advanced features', 'Slower customer support'),
4.70,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '75%'),
  JSON_OBJECT('stars', 4, 'pct', '18%'),
  JSON_OBJECT('stars', 3, 'pct', '4%'),
  JSON_OBJECT('stars', 2, 'pct', '2%'),
  JSON_OBJECT('stars', 1, 'pct', '1%')
),
JSON_ARRAY('Easy to use', 'Regulated and insured', 'Wide coin selection', 'Great mobile app', 'Educational resources'),
JSON_ARRAY('Higher fees', 'Limited advanced features', 'Slower support response')
);

-- Prop Firms
INSERT INTO reviews (review_type, name, slug, rating, reviews, description, url_site, logo, logo_bg, tags, stats, terms, key_info, content, pros, cons, average_rating, rating_breakdown, advantages, disadvantages) VALUES
('prop', 'FTMO', 'ftmo', 5.00, 25000, 'FTMO is one of the most popular prop trading firms, offering traders the opportunity to trade with company capital. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#1a1a1a]',
JSON_ARRAY('Prop Firm', 'Verified', 'Global'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Challenge Fee', 'value', '$155 - $1,089'),
  JSON_OBJECT('icon', 'percent', 'title', 'Profit Split', 'value', 'Up to 90%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2015'),
  JSON_OBJECT('icon', 'trending_up', 'title', 'Max Capital', 'value', '$400,000'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Payouts', 'value', 'Weekly')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Challenge Types:', 'value', 'Normal, Aggressive'),
  JSON_OBJECT('label', 'Profit Target:', 'value', '10% - 20%'),
  JSON_OBJECT('label', 'Daily Loss:', 'value', '5%'),
  JSON_OBJECT('label', 'Max Drawdown:', 'value', '10%')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Challenge:', 'value', '$10,000'),
  JSON_OBJECT('label', 'Maximum Challenge:', 'value', '$400,000'),
  JSON_OBJECT('label', 'Profit Split:', 'value', '80% - 90%'),
  JSON_OBJECT('label', 'Payout Frequency:', 'value', 'Weekly')
),
'<p>FTMO (Funded Trading Markets Organization) is one of the leading proprietary trading firms, allowing traders to prove their skills through challenges and trade with company capital. With over 400,000 registered traders and millions in payouts, FTMO has established itself as a trusted name in the prop trading industry.</p>\n\n<h3>Challenge System</h3>\n<p>FTMO\'s two-step challenge system allows traders to prove their skills and gain access to funded accounts with company capital.</p>\n\n<h3>Profit Split</h3>\n<p>Traders can earn up to 90% of their profits, with the first payout available after just 4 trading days.</p>\n\n<h3>Account Sizes</h3>\n<p>Choose from account sizes ranging from $10,000 to $400,000, with the option to scale up after consistent performance.</p>\n\n<h3>Trading Rules</h3>\n<p>Clear and transparent trading rules with daily loss limits, maximum drawdown, and profit targets that are achievable for skilled traders.</p>',
JSON_ARRAY('High profit split (up to 90%)', 'Weekly payouts', 'No time limit on challenges', 'Multiple account sizes', 'Transparent rules'),
JSON_ARRAY('Challenge fees required', 'Strict trading rules', 'Limited trading styles'),
4.90,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '88%'),
  JSON_OBJECT('stars', 4, 'pct', '8%'),
  JSON_OBJECT('stars', 3, 'pct', '2%'),
  JSON_OBJECT('stars', 2, 'pct', '1%'),
  JSON_OBJECT('stars', 1, 'pct', '1%')
),
JSON_ARRAY('High profit split', 'Weekly payouts', 'No time limits', 'Multiple account sizes', 'Scaling plan available'),
JSON_ARRAY('Challenge fees', 'Strict rules', 'Limited trading styles')
),
('prop', 'The5ers', 'the5ers', 4.50, 25000, 'The5ers offers a unique prop trading experience with a focus on gradual growth and risk management. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#0066CC]',
JSON_ARRAY('Prop Firm', 'Verified', 'Global'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Challenge Fee', 'value', '$95 - $485'),
  JSON_OBJECT('icon', 'percent', 'title', 'Profit Split', 'value', 'Up to 80%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2016'),
  JSON_OBJECT('icon', 'trending_up', 'title', 'Max Capital', 'value', '$4,000,000'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Payouts', 'value', 'Monthly')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Challenge Types:', 'value', 'Bootcamp'),
  JSON_OBJECT('label', 'Profit Target:', 'value', '6% - 12%'),
  JSON_OBJECT('label', 'Daily Loss:', 'value', '5%'),
  JSON_OBJECT('label', 'Max Drawdown:', 'value', '12%')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Challenge:', 'value', '$4,000'),
  JSON_OBJECT('label', 'Maximum Challenge:', 'value', '$4,000,000'),
  JSON_OBJECT('label', 'Profit Split:', 'value', '50% - 80%'),
  JSON_OBJECT('label', 'Payout Frequency:', 'value', 'Monthly')
),
'<p>The5ers is a proprietary trading firm that focuses on gradual account growth and risk management. The firm\'s unique Bootcamp program allows traders to start with smaller accounts and gradually scale up as they prove their consistency and profitability.</p>\n\n<h3>Bootcamp Program</h3>\n<p>The5ers\' Bootcamp program allows traders to start with smaller accounts and gradually scale up, focusing on consistent growth rather than quick profits.</p>\n\n<h3>Risk Management</h3>\n<p>The firm emphasizes proper risk management with clear rules and guidelines to help traders develop sustainable trading strategies.</p>\n\n<h3>Scaling System</h3>\n<p>Traders can scale their accounts from $4,000 to $4,000,000 through consistent performance and meeting specific milestones.</p>\n\n<h3>Educational Support</h3>\n<p>The5ers provides educational resources and support to help traders improve their skills and succeed in the program.</p>',
JSON_ARRAY('Lower challenge fees', 'Gradual scaling system', 'Focus on risk management', 'Flexible trading rules', 'Good educational resources'),
JSON_ARRAY('Lower profit split than competitors', 'Monthly payouts only', 'Longer scaling process'),
4.50,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '72%'),
  JSON_OBJECT('stars', 4, 'pct', '18%'),
  JSON_OBJECT('stars', 3, 'pct', '6%'),
  JSON_OBJECT('stars', 2, 'pct', '2%'),
  JSON_OBJECT('stars', 1, 'pct', '2%')
),
JSON_ARRAY('Lower challenge fees', 'Gradual scaling', 'Risk management focus', 'Educational resources', 'Flexible rules'),
JSON_ARRAY('Lower profit split', 'Monthly payouts', 'Slower scaling')
),
('prop', 'TopStep', 'topstep', 5.00, 25000, 'TopStep is known for its innovative tools, multiple account types, and attractive bonuses for traders of all levels. There are many variations of passages of Lorem Ipsum available.', NULL, NULL, 'bg-[#FF6B00]',
JSON_ARRAY('Prop Firm', 'Verified', 'US Based'),
JSON_ARRAY(
  JSON_OBJECT('icon', 'payments', 'title', 'Challenge Fee', 'value', '$165 - $499'),
  JSON_OBJECT('icon', 'percent', 'title', 'Profit Split', 'value', 'Up to 90%'),
  JSON_OBJECT('icon', 'schedule', 'title', 'Established', 'value', '2012'),
  JSON_OBJECT('icon', 'trending_up', 'title', 'Max Capital', 'value', '$150,000'),
  JSON_OBJECT('icon', 'account_balance_wallet', 'title', 'Payouts', 'value', 'Weekly')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Challenge Types:', 'value', 'Trading Combine'),
  JSON_OBJECT('label', 'Profit Target:', 'value', '6% - 12%'),
  JSON_OBJECT('label', 'Daily Loss:', 'value', '5%'),
  JSON_OBJECT('label', 'Max Drawdown:', 'value', '6%')
),
JSON_ARRAY(
  JSON_OBJECT('label', 'Minimum Challenge:', 'value', '$50,000'),
  JSON_OBJECT('label', 'Maximum Challenge:', 'value', '$150,000'),
  JSON_OBJECT('label', 'Profit Split:', 'value', '90%'),
  JSON_OBJECT('label', 'Payout Frequency:', 'value', 'Weekly')
),
'<p>TopStep is a leading proprietary trading firm specializing in futures trading. The firm\'s Trading Combine program allows traders to prove their skills and gain access to funded accounts. With a focus on futures markets, TopStep provides traders with the tools and capital needed to succeed in professional trading.</p>\n\n<h3>Trading Combine</h3>\n<p>TopStep\'s Trading Combine program allows traders to demonstrate their skills through simulated trading before receiving funded accounts.</p>\n\n<h3>Futures Focus</h3>\n<p>Specializing in futures markets, TopStep provides traders with access to a wide range of futures contracts and trading opportunities.</p>\n\n<h3>Trading Tools</h3>\n<p>TopStep provides innovative trading tools and analytics to help traders improve their performance and make informed decisions.</p>\n\n<h3>Community Support</h3>\n<p>The firm offers a strong community of traders with forums, webinars, and educational resources to support trader development.</p>',
JSON_ARRAY('High profit split (90%)', 'Weekly payouts', 'Futures specialization', 'Good trading tools', 'Strong community support'),
JSON_ARRAY('Limited to futures', 'Stricter drawdown rules', 'Higher challenge fees'),
4.80,
JSON_ARRAY(
  JSON_OBJECT('stars', 5, 'pct', '82%'),
  JSON_OBJECT('stars', 4, 'pct', '12%'),
  JSON_OBJECT('stars', 3, 'pct', '3%'),
  JSON_OBJECT('stars', 2, 'pct', '2%'),
  JSON_OBJECT('stars', 1, 'pct', '1%')
),
JSON_ARRAY('High profit split', 'Weekly payouts', 'Futures specialization', 'Great trading tools', 'Strong community'),
JSON_ARRAY('Futures only', 'Strict drawdown', 'Higher fees')
);

