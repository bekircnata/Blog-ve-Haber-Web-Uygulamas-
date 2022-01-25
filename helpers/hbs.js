const htmlspecialchars = require('htmlspecialchars');
const moment = require('moment');
const decode = require('decode-html')
const Handlebars = require('handlebars')


module.exports = {

    // Tarih İşlemleri
    generateDate: (date, format) => {
        return moment(date).format(format);
    },

    limit: (arr, limit) => {
        if(!Array.isArray(arr)) {
            return []
        }else {
            return arr.slice(0,limit)
        }
    },
    // Anasayfada postların altında gösterilecek harf sınırı
    truncate : (str) => {
        const len = 120
        if(str.length > len) {
            str = str.substring(0, len)
            return str
            
        }
    },
    // Sayfalama
    paginate: (options) => {
        let outputHTML = ""

        if(options.hash.current == 1) {
            outputHTML += `<li class="page-item disabled"><a class="page-link">İlk</a></li>`
        }else {
            outputHTML += `<li class="page-item"><a class="page-link" href=?page=1>First</a></li>`
        }

        let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 3 : 1)

        if (i !== 1) {
            outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`
        }

        for (; i <= (Number(options.hash.current) + 3) && i<= options.hash.pages; i++) {
            if(i == options.hash.current) {
                outputHTML += `<li class="page-item active"><a class="page-link">${i}</a></li>`
            }else {
                outputHTML += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`
            }

            if(i == Number(options.hash.current) + 3 && i < options.hash.pages) {
                outputHTML += `<li class="page-item disabled"><a class="page-link">...</a></li>`
            }
        }

        if(options.hash.current == options.hash.pages) {
            outputHTML += `<li class="page-item disabled"><a class="page-link">Son</a></li>`
        }else {
            outputHTML += `<li class="page-item"><a class="page-link" href="?page=${options.hash.pages}">Son</a></li>`
        }

        return outputHTML;
    }, 

}