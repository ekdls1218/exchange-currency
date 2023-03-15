// 환전 웹 만들기 
//1. 박스 2개 만들기
//2. 드롭다운 리스트 만들기
//3. 환율정보 들고오기
//4. 드랍다운 리스트에서 아이템 선택하면 아이템 바뀜
//5. 금액을 입력하면 환전이 된다
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨 (항상 위에 써있는 금액 기준으로)
//7. 반대로 밑 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다.

// 변수 안에 여러 정보를 넣고 싶을 때는 객체로 넣기
let currencyRatio = {
    USD : {
        KRW : 1314.80,
        USD : 1,
        VND : 23795.00,
        unit : "달러"
    },

    KRW : {
        KRW : 1,
        USD : 0.00076,
        VND : 18.10,
        unit : "원"
    },

    VND : {
        KRW : 0.055, 
        USD : 0.000042,
        VND : 1,
        unit : "동"
    }
}

// console.log(currencyRatio.KRW.unit); 
//console.log(currencyRatio["KRW"]["unit"]);


let fromCurrency = 'USD';
let toCurrency = 'USD';
let fromAmount = 0;
let fromConvertedAmount = 0;
let toAmount = 0;
let toConvertedAmount = 0;

console.log(fromAmount)

document.querySelectorAll("#from-currency-list a").forEach((menu) => {
    menu.addEventListener("click", function() {
        // 1. 버튼을 가져온다
        // 2. 버튼의 값을 선택한 값으로 바꾼다.
        // 3. 선택된 currency값을 변수에 저장해준다.
        document.getElementById('from-button').textContent = this.textContent;
        fromCurrency = this.textContent;
        //console.log(fromCurrency);

        convert();
        
        

    })
})

document.querySelectorAll("#to-currency-list a").forEach((menu) => {
    menu.addEventListener("click", function() {
        document.getElementById("to-button").textContent = this.textContent;
        toCurrency = this.textContent;

        convert();
        
    })
})


// 1. 금액을 입력하는 순간
// 2. 그 금액에 맞게 환전이 되어서
// 3. 환전된 값이 보인다.

// from 환전 함수
function convert() {
    
    // 환전
    // 1. 얼마를 환전? 가지고 있는 돈이 뭔지? 바꾸고자하는 돈이 뭔지?
    // 2. 돈 * 환율 = 환전 금액
    console.log(fromAmount)

    // 인풋값에 적은 돈 값 가져오기
    fromAmount = document.getElementById("from-input").value;

    // from div에 쓴 금액 나타내기
    document.getElementById("from-unit").textContent = fromAmount + currencyRatio[fromCurrency].unit;
    
    // 환전 금액, 소수점자리 반올림하기
    fromConvertedAmount = Math.round(fromAmount * currencyRatio[fromCurrency][toCurrency]* 100) / 100;
    
    
    // 환전 금액 to인풋값에 넣기
    document.getElementById("to-input").value = fromConvertedAmount;
    // 환전 단위 to디브값에 나타내기
    document.getElementById("to-unit").textContent = fromConvertedAmount + currencyRatio[toCurrency].unit;
    
    
    //console.log(typeof fromConvertedAmount, fromConvertedAmount.toLocaleString());
    // console.log(typeof document.getElementById("to-input").value);
    // console.log(document.getElementById("to-unit").textContent)
    

}

function toConvert() {
    toAmount = document.getElementById("to-input").value;

    document.getElementById("to-unit").textContent = toAmount + currencyRatio[toCurrency].unit;

    toConvertedAmount = Math.round(toAmount * currencyRatio[toCurrency][fromCurrency] * 100) / 100;

    document.getElementById("from-input").value = toConvertedAmount;
    
    fromAmount = toConvertedAmount;

    document.getElementById("from-unit").textContent = toConvertedAmount + currencyRatio[fromCurrency].unit;

}




/**
 * 환전
 * 환전 단위 선택함
 * 환전하고 싶은 금액을 쓴다 -> 자동으로 환전이 됨
 * 다른 단위로 바꾸고 싶다면 위에서 선택하면 됨 - > 바꾸면 위의 금액을 기준으로 환전이 됨
 * 아래에서 금액을 써도 환전이 됨
 * 그러나 아래에서 금액을 써도 단위를 바꿀 때 위의 금액을 기준으로 환전이 됨
 */
