const englishText = `
    NAME : CT3<br>
    BIRTH-DATE : 2000 BC<br>
    MBTI : INTJ-T<br>
    JOB : VLOGGER<br>
    FROM : NEPTUNE-T3<br>
    FAV-PET : FISH<br>
    FAV-PLANET : SATURN<br>
    FAV-FOOD : N/A<br>
    UNFAV-FOOD : FISH<br>
`;

const gibberishText = `
    Na-Mal : CT3<br>
    Mway-Ya : [NULL][ENDOFTEXT]-[NULL][ENDOFTEXT]-[SPACE][NULL][ENDOFTEXT]<br>
    MBTI : INTJ-T<br>
    POSITION-NT3 : A-HTOO-AGENT<br>
    POSITION-EARTH : VLOGGER<br>
    Bal-Ka : NEPTUNE-T3<br>
    fav-aYong : A-NI-YONG<br>
    fav-taRateson : NGAAAAA<br>
    fav-planet : SATURN<br>
    fav-food : N/A<br>
    defav-food : NGAAAAA<br>
`;

let isGibberish = true;
const introText = document.getElementById('index-text');
introText.innerHTML = gibberishText; 

function toggleTranslation() {
    const button = document.getElementById('translate-btn');
    
    if (isGibberish) {
        introText.innerHTML = englishText;
        button.innerHTML = 'De-Translate'; 
    } else {
        introText.innerHTML = gibberishText;
        button.innerHTML = 'Translate'; 
    }

    isGibberish = !isGibberish;
    button.style.transition = 'background 0.3s ease, transform 0.2s ease'; 
}