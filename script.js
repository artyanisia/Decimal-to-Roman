window.addEventListener("load", (event) => {
    
    const values = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    const counter  = {
        '1000': '',
        '500': '',
        '100': '',
        '50': '',
        '10': '',
        '5': '',
        '1': ''
    }
    const convertRoman = document.getElementById('convertRoman');

    function convertRomanNumber(){

        const romanNumber= document.getElementById('romanNumber').value.trim();
        const outputRoman = document.getElementById('outputRoman');

        if(/^[A-Z]+$/.test(romanNumber)){
            let sum = 0;
            for(let i = 0; i < romanNumber.length; i++){
                if(values[romanNumber[i]]<values[romanNumber[i+1]]){
                    sum += values[romanNumber[i+1]] - values[romanNumber[i]];
                    i++;
                }
                else sum += values[romanNumber[i]];
            }
            outputRoman.textContent = `${sum}`;
        }
        else if(/^[a-z]+$/.test(romanNumber))
            outputRoman.textContent = 'Please write a capital letter';
        else{
            outputRoman.textContent = 'Please write a valid number (eg: I, V, X, L, C, D, M)';
        }
    }
    convertRoman.addEventListener('click',convertRomanNumber);

    let convertDecimal = document.getElementById('convertDecimal');

    function convertDecimalNumber(){

        let decimalNumber= document.getElementById('decimalNumber').value.trim();
        let outputDecimal = document.getElementById('outputDecimal');

        if(/^\d+$/.test(decimalNumber)){

            let string = [];

            let items = Object.entries(values).reverse();
            let sum = decimalNumber;
            let count;
            function intCalc(number, mult){
                return Math.floor(number/mult);
            }
            while(sum > 0){
                for(let [key,val] of items){
                    if(val <= sum){
                        count = intCalc(sum,val);
                        sum -= val * count;
                        counter[val] = count;
                    }
                }
            }
            let item = Object.entries(counter);
            items = Object.entries(values);
            for(let i = 0; i < item.length; i++){
                let [key,val] = item[i];
                if(val == 4){
                    if(item[i][1] == 4 && item[i+1][1] == 1){
                        string.unshift(items[i+2][0]);
                        string.unshift(items[i][0]);
                        item[i+1][1]=0;
                    }
                    else{
                        string.unshift(items[i+1][0]);
                        string.unshift(items[i][0]);
                        
                    }
                    
                }
                else{
                    while(val){
                        string.unshift(items[i][0]);
                        val--;
                    }
                }
            }
            outputDecimal.textContent = string.join('');
        }
        else{
            outputDecimal.textContent = 'Please write a valid number (only digits allowed)';
        }
    }
    convertDecimal.addEventListener('click',convertDecimalNumber);

})
