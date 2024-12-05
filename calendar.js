class Calendar {
   daysOfWeekNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
   monthNamesRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

   constructor(date) {
      this.date = date instanceof Date ? date : new Date()
      this.date.setDate(1)
      this.month = this.date.getMonth()

      return this.buildTable()
   }

   buildTable() {
      const table = document.createElement('table')
      table.append( this.createCaption(), this.createHead(), this.createBody() )

      return table
   }

   createCaption() {
      const caption = document.createElement('caption')
      caption.textContent = this.monthNamesRU[this.month] + ' ' + this.date.getFullYear()
      return caption
   }


   createHead() {
      const thead = document.createElement('thead')

      const tr = document.createElement('tr')
      thead.append(tr)

      this.daysOfWeekNames.forEach(day => {
         const th = document.createElement('th')
         th.textContent = day
         tr.append(th)
      })

      return thead
   }


   createBody() {
      const tBody = document.createElement('tbody')

      while (this.month === this.date.getMonth()) {
         tBody.append( this.createRows() )
      }

      return tBody
   }


   createRows() {
      let tr = document.createElement('tr')

      if ( this.getDayOfWeek() ) {
         for (let i = this.getDayOfWeek(); i > 0; i--) {
            tr.append( this.createCell() )
         }
      }

      while (tr.cells.length < 7 && this.month === this.date.getMonth()) {
         tr.append( this.createCell( this.date.getDate() ))
      }

      if (this.month !== this.date.getMonth() && this.getDayOfWeek()) {
         for (let i = this.getDayOfWeek(); i < 7; i++) {
            tr.append( this.createCell() )
         }
      }

      return tr
   }

   createCell(text = '') {
      const isEmpty = !String(text).length 
      const td = document.createElement('td')
      if (!isEmpty) {
         td.textContent = text
         td.dataset.jsDay = text
         this.stepToNextDay()
      } else {
         td.dataset.jsEmpty = true
      }
      return td
   }

   getDayOfWeek() {
      let day = this.date.getDay();
      if (day === 0) day = 7
      return day - 1
   }

   stepToNextDay() {
      this.date.setDate( this.date.getDate() + 1)
   }
}



class ChangeMonth {
   currentMonth = new Date().getMonth()
   constructor() {
      this.calendarElement = document.getElementById('calendarElement')
      this.renderCalendar()
      this.bindEvents()
   }

   renderCalendar() {
      const firstChild = this.calendarElement.firstElementChild
      firstChild ? firstChild.remove() : null
      this.calendarElement.append(new Calendar(new Date(2024, this.currentMonth)))
   }

   bindEvents() {
      document.addEventListener('click', (event) => this.onClick(event))
   }

   onClick(event) {
      if (event.target.id === 'checkDay') {
         if (this.currentMonth === new Date().getMonth()) {
            this.highlightDay()
         } else {
            this.currentMonth = new Date().getMonth()
            this.renderCalendar()
            this.highlightDay()
         }

      }
      if (event.target.id === 'monthChangePrevious') {
         this.renderCalendar(--this.currentMonth)
      }
      if (event.target.id === 'monthChangeNext') {
         this.renderCalendar(++this.currentMonth)
      }

   }

   highlightDay() {
      const currentDay = new Date().getDate()
      const currentDayCell = document.querySelector(`td[data-js-day="${currentDay}"]`)
      currentDayCell.style.color = 'red'
   }

}

new ChangeMonth()