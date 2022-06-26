// код ниже по условию задачи должен находиться в файле state-dom.js

  // создаём массив из объектов. Это наша основная "база данных" :)
  const todos = [
    {
      text: 'Выкинуть ненужные вещи',
      done: false
    },
    {
      text: 'Купить MacBook с процессором M1',
      done: true,
    },
    {
      text: 'Отправиться в кругосветное путешествие',
      done: false
    },
    {
      text: 'Разбить всю посуду в доме',
      done: false
    },
    {
      text: 'Узнать кто убил Кеннеди',
      done: false
    }
  ];

  // пишем функцию, которая будет рендерить на страницу все элементы из
  // принятого в параметре массива (этим массивом будет todos)
  const render = (listOfTodos) => {
    // получаем узел div#list. Он нужен нам, чтобы добавлять в него
    // элементы списка.
    const mainContainerNode = document.getElementById('list');

    // сначала очищаем его от текущего содержимого
    mainContainerNode.textContent = "";

    for(let i = 0; i < listOfTodos.length; i++) {
      // создаём узел для текущего элемента с тегом div
      const todoContainerNode = document.createElement('div');

      // создаём узел для чекбокса
      const checkboxNode = document.createElement('input');

      // создаём узел для текста текущего дела
      const todoTextNode = document.createElement('div');

      // создаём узел для кнопки удаления
      const removeButtonNode = document.createElement('button');

      // добавляем класс для главного контейнера
      todoContainerNode.classList.add('list__item');

      // вкладываем дочерние узлы в основной
      todoContainerNode.append(checkboxNode, todoTextNode, removeButtonNode);

      // оформляем чекбокс
      // сначала устанавливаем его тип
      checkboxNode.type = "checkbox";

      // устанавливаем галочку, если она нужна (то есть в случае, если ключ
      // done текущего элемента === true
      checkboxNode.checked = listOfTodos[i].done;

      // прикрепляем обработчик события на чекбокс
      // обработку можно сделать как на событие 'click', так и на 'change',
      // однако второй вариант в данном случае более информативен
      checkboxNode.addEventListener('change', () => {
        // вызываем функцию checkTodo, передавая в него текущий индекс
        checkTodo(i);
      })

      // если текущее дело выполнено, то задаем модификатор для родительского
      // контейнера, чтобы можно было оформить его по особым стилям
      if(listOfTodos[i].done === true) {
        todoContainerNode.classList.add('list__item_checked')
      }

      // добавляем в узел todoTextNode текст из текущего дела
      todoTextNode.textContent = listOfTodos[i].text;

      // устанавливаем класс для этого узла, чтобы тексту можно было
      // задавать отдельные стили
      todoTextNode.classList.add('list__text');

      // дорабатываем узел кнопки. Сначала задаем кнопке название
      removeButtonNode.textContent = '❌'; // можно использовать смайлик :)

      // по аналогии с чекбоксом устанавливаем слушатель события
      removeButtonNode.addEventListener('click', () => {
        remove(i);
      });

      // когда всё готово вкладываем основной блок в контейнер #list
      mainContainerNode.append(todoContainerNode);
    }
  }

  // функция удаления дела из списка по его индексу
  const remove = (index) => {
    // удаляем от указанного индекса ровно один элемент
    todos.splice(index, 1);

    // после удаления еще раз запускаем render(), т.к. теперь список дел
    // обновился и его нужно отрисовать заново
    render(todos);
  }

  // функция отметки дела выполненным по его индексу
  const checkTodo = (index) => {
    // изменяем ключ done для нужного индекса на противоположный
    todos[index].done = !todos[index].done

    // после изменения еще раз запускаем render(), т.к. теперь список дел
    // обновился и его нужно отрисовать заново
    render(todos);
  }

  // функция для добавления нового объекта в список дел
  const addTodo = (text) => {
    // с помощью метода .push добавляем в конец массива новый объект
    // с нужными ключами
    todos.push({
      text: text,
      done: false
    });

    // после этого делаем рендер по новому, т.к. список дел теперь обновился
    render(todos);
  }

  // устанавливаем слушатель события на форму
  // данное событие сработает в двух случаях: если пользователь нажмет на интер,
  // либо если он нажмет на кнопку добавления
  document.getElementById('form').addEventListener('submit', (e) => {
    // нужно остановить действие по умолчанию для формы, иначе страница будет
    // перезагружаться и список дел будет сбрасываться
    e.preventDefault();

    // затем получаем узел окна ввода, чтобы можно было достать из него текст
    const formInput = document.getElementById('form__input');

    // добавляем текст из окна ввода в список
    addTodo(formInput.value);

    // очищаем окно ввода
    formInput.value = "";
  })

  // вызываем функцию, чтобы в момент загрузки страницы сразу отрисовались
  // элементы списка дел
  render(todos);