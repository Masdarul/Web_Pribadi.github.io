$(document).ready(function(){
    $('.next').click(function(){ // untuk tombol next
        $('.pagination').find('.pageNumber.active').next().
            addClass('active'); // menambahkan selanjutnya
        $('.pagination').find('.pageNumber.active').prev().
            removeClass('active'); // menghapus sebelumnya
    })
    $('.prev').click(function(){ // untuk tombol prev
        $('.pagination').find('.pageNumber.active').prev().
            addClass('active'); // menambahkan sebelumnya
        $('.pagination').find('.pageNumber.active').next().
            removeClass('active'); // menghapus selanjutnya 
    })
})