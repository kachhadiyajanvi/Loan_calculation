import './App.css';
import { useState, useEffect } from 'react';

function App() {
	let [amount, setamount] = useState('');
	let [rate, setrate] = useState('');
	let [Term, setterm] = useState('');
	let [ans, setans] = useState([]);
	const [todayDate, setTodayDate] = useState(getDefaultTodayDate());
	function getDefaultTodayDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	useEffect(() => {
		setTodayDate(getDefaultTodayDate());
	}, []);

	const handleEMI = () => {
		if (amount === '' || rate === '' || Term === '') {
			alert('Alert! Enter Amount / Rate / Term');
			return;
		}

		let loanAmount = parseFloat(amount);
		const rates = parseFloat(rate) / 100;
		const terms = Term * 12;
		const payment = (rates * loanAmount) / (1 - Math.pow(1 + rates, -terms));

		let year = new Date().getFullYear();
		let month = new Date().getMonth() + 1;

		let tempAns = [];

		for (let i = 1; i <= terms; i++) {
			const interest = loanAmount * rates;
			const principal = payment - interest;
			const balance = loanAmount - principal;
			const monthNameList = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];
			const monthName = monthNameList[month];
			var obj = {
				monthNameList: monthName,
				year: year,
				amount: loanAmount.toFixed(2),
				principal: parseFloat(principal.toFixed(2)),
				interest: parseFloat(interest.toFixed(2)),
				payment: parseFloat(payment.toFixed(2)),
				balance: Math.abs(parseFloat(balance.toFixed(2))),
			};
			tempAns.push(obj);

			if (month === 12) {
				month = 1;
				year++;
			} else {
				month++;
			}

			loanAmount = balance;
		}

		setans(tempAns);
	};

	return (
		<div className="App">
			<div className="container">
				<h1>LOAN Amortization Calculator</h1>
				<div className="name">
					<h4>Loan Amount:</h4>
					<input type="text" name="" placeholder="Enter Amount" value={amount} onChange={(e) => setamount(e.target.value)}></input>
				</div>
				<div className="name">
					<h4>Interest Rate:</h4>
					<input type="text" name="" placeholder="Enter Rate" value={rate} onChange={(e) => setrate(e.target.value)}></input>
				</div>
				<br></br>
				<div className="name">
					<h4>Term:</h4>
					<input type="text" name="" placeholder="Enter Term" value={Term} onChange={(e) => setterm(e.target.value)}></input>
				</div>
				<div className="name">
					<h4>Start Date:</h4>
					<input type="date" name="" value={todayDate} onChange={(e) => setTodayDate(e.target.value)}></input>
				</div>
				<div className="btn">
					<input type="button" name="" className="button" value="EMI Calculate" onClick={handleEMI}></input>
				</div>
				<table id="result" border="1" cellpadding="10" cellspacing="7">
					<tr>
						<td>Month/Year:</td>
						<td>Amount</td>
						<td>Principal</td>
						<td>Interest</td>
						<td>Payment</td>
						<td>Balance</td>
					</tr>
					{ans.map((row, index) => (
						<tr key={index}>
							<td>{row.monthNameList}, {row.year}</td>
							<td>{row.amount}</td>
							<td>{row.principal}</td>
							<td>{row.interest}</td>
							<td>{row.payment}</td>
							<td>{row.balance}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
}

export default App;
