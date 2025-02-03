const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };
  
  const applyOperation = (operator: string, num1: number, num2: number): number => {
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: throw new Error(`Unknown operator: ${operator}`);
    }
  };
  
  const evaluateExpression = (expression: string): number => {
    const tokens = expression.split(' ');
    const numberStack: number[] = [];
    const operatorStack: string[] = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      // If the token is a number, push it onto the number stack
      if (!isNaN(parseFloat(token))) {
        numberStack.push(parseFloat(token));
      }
      // If the token is an opening parenthesis, push it onto the operator stack
      else if (token === '(') {
        operatorStack.push(token);
      }
      // If the token is a closing parenthesis, evaluate the expression inside the parentheses
      else if (token === ')') {
        while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
          const operator = operatorStack.pop()!;
          const num2 = numberStack.pop()!;
          const num1 = numberStack.pop()!;
          numberStack.push(applyOperation(operator, num1, num2));
        }
        operatorStack.pop(); // Remove the '(' from the stack
      }
      // If the token is an operator
      else if (token in precedence) {
        while (
          operatorStack.length &&
          precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
        ) {
          const operator = operatorStack.pop()!;
          const num2 = numberStack.pop()!;
          const num1 = numberStack.pop()!;
          numberStack.push(applyOperation(operator, num1, num2));
        }
        operatorStack.push(token);
      }
    }
  
    // Evaluate the remaining operators in the stack
    while (operatorStack.length) {
      const operator = operatorStack.pop()!;
      const num2 = numberStack.pop()!;
      const num1 = numberStack.pop()!;
      numberStack.push(applyOperation(operator, num1, num2));
    }
  
    return numberStack.pop()!;
  };
  
  export { evaluateExpression };