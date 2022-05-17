# Notes (Vue 3, Composition API, script setup)


С помощью данной программы можно:
- Вести личный дневник с возможностью редактирования старых записей.
- Вести учёт всех задач по категориям срочности, по статусу заданий и с возможностью отображать только задания на сегодня, неделю или месяц. 
- Вести учёт своих расходов и доходов по различным статьям. Смотреть итоговую аналитику по статьям расходов/доходов за определённый промежуток времени в виде графика.

## Техническая реализация

**Дневник**

Для показа записей дневника весь массив с данными записей сортируется для формирования массивов дат. Для просмотра записей дневника можно выбрать только те дни в которых есть записи.
Есть возможность внести запись в дневник на любую дату.
Возможность редактировать старые записи дневника.

**Задачи**

Есть 3 фильтра задач (по срочности, по статусу, 3-ий фильтр доступен только для активных задач - возможность посмотреть задачи на сегодня, на неделю и на месяц вперёд).
Также сделана пагинация списка задач. 
Возможность отмечать задания выполненными.

**Бюджет**

Данные с сервера грузятся только после настройки фильтров (начальная и конечная даты). Начало периода невозможно выставить больше чем конец периода. Добавлен аккордеон для расходов и доходов.
Использованы системы provide и inject для связи глубоковложенных дочерних элементов с родителем.
На графике показываются расходы и доходы по разным статьям в процентном соотношении в выбранном диапазоне дат.

**Общее**
- Используется Vue Router для маршрутизации в SPA.
- Vuex используется для хранения общих настроек программы.
- Использована валидация форм на основе vee-validate и yup.
- Используется сетка Bootstrap 5 и стили.
- Кастомные стили написаны с помощью препроцессора SASS.
- Графики используют apexchart, зарегистрированного на уровне приложения App.
- Для запросов на сервер используется axios.
- Для проверки API использовался Postman.
- Реализация некоторых систем описана в комментариях к коду.


## Команды для установки и запуска
```
npm install
npm run serve
```

[Ссылка на Backend](https://github.com/FiloniJ/api) для данной программы.

Для связи клиента с сервером (если не на локальном ПК) на клиенте в **src/store/index.js** необходимо указать адрес сервера в переменной **localhost**
