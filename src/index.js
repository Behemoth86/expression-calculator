function eval() {
	return;
}
function expressionCalculator(expr) {
	let oper = [];
	let digit = [];
	let Arr = String(expr).split('').filter(e => e!==' ');
	for (let i = 0; i<Arr.length; i++) {
			if (/\d+/.test(Arr[i]) && /\d+/.test(Arr[i + 1])) {
					Arr[i]+=Arr[i + 1];
					Arr.splice(i + 1, 1);
					i--;
			}
	}
	let leftbrack = 0;
	let rightbrack = 0;
	for (let i = 0; i < Arr.length; i++) {
			if (Arr[i] === '(') {
					leftbrack++;
					continue;
			}
			if (Arr[i] === ')') {
					rightbrack++;
			}
	}
	if (leftbrack !== rightbrack) {
			throw new Error("ExpressionError: Brackets must be paired");
	}
	let priority = {'+': 1,'-': 1,'*': 2,'/': 2};
	for (let i = 0; i < Arr.length; i++) {
		if (/\d+/.test(Arr[i])) {
			digit.push(Number(Arr[i]));
			continue;
		}
		if (Arr[i] === '(') {
			oper.push(Arr[i]);
			continue;
		}
		if (Arr[i] === ')') {
			while (oper[oper.length - 1] !== '(') {
				calc();
			}
			oper.pop();
			continue;
		}
		if (priority[Arr[i]] > priority[oper[oper.length - 1]]) {
			oper.push(Arr[i]);
			continue;
		}
		while (priority[Arr[i]] <= priority[oper[oper.length - 1]]) {
			calc();
		}
		oper.push(Arr[i]);
	}

	function calc() {
		let act = oper.pop();
		switch (act) {
			case '+': {
				digit.push(digit.pop() + digit.pop());
				break;
			}
			case '-': {
				let second = digit.pop();
				let first = digit.pop();
				digit.push(first - second);
				break;
			}
			case '*': {
				digit.push(digit.pop() * digit.pop());
				break;
			}
			case '/': {
				let second = digit.pop();
				let first = digit.pop();
			  if (second === 0) throw new Error("TypeError: Division by zero.");
				digit.push(first / second);
			}
		}
	}
	while (oper.length > 0) {
  	calc();
	}
	return digit.pop();
}

module.exports = {
	expressionCalculator
}