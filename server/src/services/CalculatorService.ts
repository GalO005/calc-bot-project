type Operator = '+' | '-' | '*' | '/';
type Token = number | Operator | '(' | ')';

const calculateExpression = (expression: string): number | string => {
  try {
    // Validate the expression to ensure it only contains valid characters
    if (!/^\s*[\d+\-*/().\s]+\s*$/.test(expression)) {
      return "Invalid expression";
    }

    // Check for consecutive operators
    if (/[\+\-\*/]{2,}/.test(expression.replace(/\s+/g, ""))) {
      return "Invalid expression";
    }

    // Tokenize the expression
    const tokens = expression.match(/(\d+(\.\d+)?|[\+\-\*\/\(\)])/g);
    if (!tokens) return 'Invalid expression';

    // Stack for numbers
    const numberStack: number[] = [];
    // Stack for operators
    const operatorStack: (Operator | '(')[] = [];

    // Precedence map for operators
    const precedence: Record<Operator, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    // Function to apply an operation
    const applyOperation = (operator: Operator, num1: number, num2: number): number => {
      switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': 
            if (num2 === 0) throw new Error("Division by zero");
            return num1 / num2;
        default: throw new Error(`Unknown operator: ${operator}`);
      }
    };

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
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
          const operator = operatorStack.pop() as Operator;
          const num2 = numberStack.pop()!;
          const num1 = numberStack.pop()!;
          numberStack.push(applyOperation(operator, num1, num2));
        }
        // Pop the opening parenthesis from the operator stack
        operatorStack.pop();
      }
      // If the token is an operator, handle precedence
      else {
        while (
          operatorStack.length > 0 &&
          operatorStack[operatorStack.length - 1] !== '(' &&
          precedence[operatorStack[operatorStack.length - 1] as Operator] >= precedence[token as Operator]
        ) {
          const operator = operatorStack.pop() as Operator;
          const num2 = numberStack.pop()!;
          const num1 = numberStack.pop()!;
          numberStack.push(applyOperation(operator, num1, num2));
        }
        // Push the current operator onto the operator stack
        operatorStack.push(token as Operator);
      }
    }

    // Evaluate any remaining operations
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop() as Operator;
      const num2 = numberStack.pop()!;
      const num1 = numberStack.pop()!;
      numberStack.push(applyOperation(operator, num1, num2));
    }

    // The final result is the only number left on the number stack
    return numberStack.pop()!;
  } catch (e) {
    return (e as Error).message;
  }
};

export default calculateExpression;