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
	
	var romanDigitValues = [1, 5, 10, 50, 100, 500, 1000];

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
		
		var counter  = {
			'1000': '',
			'500': '',
			'100': '',
			'50': '',
			'10': '',
			'5': '',
			'1': ''
		}
		
		var counter2 = new Map(
			[
				[1000, 0],
				[500, 0],
				[100, 0],
				[50, 0],
				[10, 0],
				[5, 0],
				[1, 0]
			]
		);
		
		var digitsToRomanDigits = new Map(
		[
			[1, 'I'],
			[5, 'V'],
			[10, 'X'],
			[50, 'L'],
			[100, 'C'],
			[500, 'D'],
			[1000, 'M']
		]);

        let decimalNumber= document.getElementById('decimalNumber').value.trim();
        let outputDecimal = document.getElementById('outputDecimal');
		let outputDecimalRefactor = document.getElementById('outputDecimalRefactor');
		
        if(/^\d+$/.test(decimalNumber)){

            let string = [];
			let convertedNumber = [];
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
						counter2.set(val, count);
                    }
                }
            }


			for (let i = 0; i < romanDigitValues.length; i++)
			{
				currentValue = romanDigitValues[i];
				count = counter2.get(currentValue);				
                if(count == 4){
					// if a roman digit appears 4 times and the next roman digit appears once we need to insert the digit after the next one (4*1 + 5 = 9 => IX, not VIIII)
                    if(count == 4 && counter2.get(romanDigitValues[i+1]) == 1){
						var valueToAdd = romanDigitValues[i+2];
                        convertedNumber  = [digitsToRomanDigits.get(currentValue) , digitsToRomanDigits.get(valueToAdd) , ...convertedNumber];						
                        counter2.set(romanDigitValues[i+1],0);
						continue;
                    }                    
					var valueToAdd = romanDigitValues[i+1];
					convertedNumber = [digitsToRomanDigits.get(valueToAdd), ...convertedNumber];
					convertedNumber = [digitsToRomanDigits.get(currentValue), ...convertedNumber];
					continue;
                }                
				while(count){
					convertedNumber = [digitsToRomanDigits.get(currentValue), ...convertedNumber];
					count--;
				}                
			};
			
			outputDecimalRefactor.textContent = convertedNumber.join('');
			
			let item = Object.entries(counter);
            items = Object.entries(values);
			
			
            for(let i = 0; i < item.length; i++){
                let val = item[i][1];
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
