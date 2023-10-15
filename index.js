function counter(n) {
    let current = n;
  
    const interval = setInterval(() => {
      console.log(current);
      current--;
  
      if (current < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
  
  function createCounter(n) {
    let current = n;
    let interval;
  
    function start() {
      if (!interval) {
        interval = setInterval(() => {
          console.log(current);
          current--;
  
          if (current < 0) {
            clearInterval(interval);
            interval = null;
          }
        }, 1000);
      }
    }
  
    function pause() {
      clearInterval(interval);
      interval = null;
    }
  
    function stop() {
      clearInterval(interval);
      interval = null;
      current = n;
    }
  
    return {
      start,
      pause,
      stop,
    };
  }
  
  //2
  
  async function delayCounter(n) {
    for (let i = n; i >= 0; i--) {
      console.log(i);
      await delay(1000);
    }
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  //3
  
  class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  function loadJson(url) {
    return fetch(url)
      .then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new HttpError(response);
        }
      })
  }
  
  // Запрашивается логин, пока github не вернёт существующего пользователя.
  async function getGithubUser() {
    while (true) {
      let name = prompt("Введите логин?", "iliakan");
      try {
        const response = await fetch(`https://api.github.com/users/${name}`);
        if (response.status === 200) {
          const user = await response.json();
          alert(`Полное имя: ${user.name}.`);
          break;
        } else if (response.status === 404) {
          alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        } else {
          throw new Error(`HTTP Error: ${response.status}`);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }
  
  getGithubUser();