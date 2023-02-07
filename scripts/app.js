const previousNumber = document.querySelector('[data-previous-operand]'),
    currentNumber = document.querySelector('[data-current-operand]'),
    allClear = document.querySelector('[data-all-clear'),
    del = document.querySelector('[data-delete]'),
    operators = document.querySelectorAll('[data-operation]'),
    operands = document.querySelectorAll('[data-number]'),
    equals = document.querySelector('[data-equal]'),
    decimal = document.getElementById('decimal');



class Calculator {

    previousNumber = 0;
    currentNumber = 0;
    operator = '';
    result = '';
    reset = false;

    constructor(previousNumberOperand, currentNumberOperand) {
        this.previousNumberOperand = previousNumberOperand;
        this.currentNumberOperand = currentNumberOperand;
    }

    displayAppendNumber(num) {
        if (this.currentNumberOperand.innerText.includes('.')) {
            if (num === '.') return;
        }


        if (!this.operator && this.reset) {
            this.previousNumberOperand.innerText = '';
            currentNumber.textContent += num
            this.reset = false;
            this.operator = '';

            return;
        }



        currentNumber.textContent += num;

    }
    displayAppendOperator(op) {
        if (this.operator) return;

        this.previousNumberOperand.innerText += this.currentNumberOperand.textContent;
        this.currentNumberOperand.textContent = '';

        if (!this.previousNumberOperand.innerText) return;
        //before 

        switch (op) {
            case '÷':
                this.previousNumberOperand.textContent += '÷';
                this.operator = '/';
                break;
            case 'x':
                this.previousNumberOperand.textContent += 'x';
                this.operator = '*';
                break;
            case '+':
                this.previousNumberOperand.textContent += '+';
                this.operator = '+';
                break;
            case '-':
                this.previousNumberOperand.textContent += '-';
                this.operator = '-';
                break;
        }
    }

    calculate() {
        if (this.previousNumberOperand.innerText === '' || this.currentNumberOperand.innerText === '') return;

        this.previousNumber = Number(this.previousNumberOperand.innerText.slice(0, this.previousNumberOperand.innerText.length - 1));

        this.currentNumber = Number(this.currentNumberOperand.innerText);

        switch (this.operator) {
            case '+': this.result = this.previousNumber + this.currentNumber; break;
            case '-': this.result = this.previousNumber - this.currentNumber;
                break;
            case '*': this.result = this.previousNumber * this.currentNumber;
                break;
            case '/':
                if (this.currentNumber === 0) {
                    // alert("Can't divide with 0");
                    this.previousNumberOperand.innerText = "Can't divide by 0";
                    this.previousNumberOperand.classList.toggle('highlight');
                    this.currentNumberOperand.textContent = '';
                    for (let num of operands) {
                        num.disabled = true;
                    }

                    return;
                }
                this.result = this.previousNumber / this.currentNumber;
                break;
        }

    }

    update() {
        if (this.previousNumberOperand.innerText === '' || this.currentNumberOperand.innerText === '') return;

        if (isNaN(this.result)) {
            this.previousNumberOperand.innerText = "Incorrect format";
            this.previousNumberOperand.classList.toggle('highlight');
            this.currentNumberOperand.textContent = '';
            for (let num of operands) {
                num.disabled = true;
            }
            return;
        }

        this.previousNumberOperand.textContent = this.result;
        this.currentNumberOperand.textContent = '';

        this.operator = ''; // to chain calculation
        this.reset = true; // for new operation if user enter numbers right after the result without any operator




    }
    clear() {
        this.previousNumber = 0;
        this.currentNumber = 0;

        this.operator = '';
        this.result = '';
        this.reset = false;
        this.currentNumberOperand.textContent = '';
        this.previousNumberOperand.textContent = '';
        this.previousNumberOperand.classList.remove('highlight');
        for (let num of operands) {
            num.disabled = false;
        }
    }

    delete() {
        if (isNaN(this.result) || this.previousNumberOperand.innerText === "Can't divide by 0") { this.clear() };

        if (this.previousNumberOperand.textContent && this.currentNumberOperand.textContent || !this.previousNumberOperand.textContent) {
            this.currentNumberOperand.innerText = this.currentNumberOperand.
                innerText.slice(0, this.currentNumberOperand.innerText.length - 1);

            return;
        }
        this.previousNumberOperand.innerText = this.previousNumberOperand.innerText.slice(0, this.previousNumberOperand.innerText.length - 1);

        this.operator = '';
        this.currentNumberOperand.innerText = this.previousNumberOperand.textContent;
        this.previousNumberOperand.innerText = '';


    }


}

const calculator = new Calculator(previousNumber, currentNumber);


operands.forEach(num => {
    num.addEventListener('click', () => {
        calculator.displayAppendNumber(num.textContent);
    })
});

for (let op of operators) {
    op.addEventListener('click', () => {
        calculator.displayAppendOperator(op.innerText);
    })
}

equals.onclick = function () {
    calculator.calculate();
    calculator.update();
}


allClear.addEventListener('click', () => {
    calculator.clear();
})

del.addEventListener('click', () => {
    calculator.delete();
})