(function () {
    const Choice = {
        quizzes: [],
        init() {
            checkUserData();
            const url = new URL(location.href);
            const infoUserArr = [];
            const testUserName = url.searchParams.get('name');
            const testUserLastName = url.searchParams.get('lastName');
            const testEmail = url.searchParams.get('email');
            if (testUserName && testUserLastName && testEmail) {
                infoUserArr.push(testUserName, testUserLastName, testEmail);
            }
            sessionStorage.setItem('user', JSON.stringify(infoUserArr));


            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://testologia.ru/get-quizzes', false);
            xhr.send();
            if (xhr.status === 200 && xhr.responseText) {
                try {
                    this.quizzes = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                this.processQuizzes();
            } else {
                location.href = 'index.html';

            }
        },
        processQuizzes(){
            const choiceOptionsElement = document.getElementById('choice-options');
            if (this.quizzes && this.quizzes.length >0)
            {
                this.quizzes.forEach( quiz => {
                    const that = this;
                   const choiceOptionElement = document.createElement('div');
                    choiceOptionElement.className = 'choice-option';
                    choiceOptionElement.setAttribute('data-id', quiz.id);
                    choiceOptionElement.onclick = function () {
                        that.chooseQuiz(this);

                    }
                   const choiceOptionTextElement = document.createElement('div');
                    choiceOptionTextElement.className = 'choice-option-text';
                    choiceOptionTextElement.innerText = quiz.name;

                   const choiceOptionArrowElement = document.createElement('div');
                    choiceOptionArrowElement.className = 'choice-option-arrow';

                   const choiceOptionImageElement = document.createElement('img');
                    choiceOptionImageElement.setAttribute('src', 'images/arrow.png');
                    choiceOptionImageElement.setAttribute('alt', 'Стрелка');

                    choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                    choiceOptionElement.appendChild(choiceOptionTextElement);
                    choiceOptionElement.appendChild(choiceOptionArrowElement);

                    choiceOptionsElement.appendChild(choiceOptionElement);
                });
            }
        },
        chooseQuiz(element) {
            const dataId = element.getAttribute('data-id')
           if (dataId) {
               location.href = 'test.html' + location.search + '&id=' + dataId;
           }
        }
    }
    Choice.init();
})();
