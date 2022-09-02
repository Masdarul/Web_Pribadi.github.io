$(document).ready(function(){ 
    $('.next').click(function(){ // Untuk Tombol Next
        $('.pagination').find('.pageNumber.active').next().
            addClass('active'); // pindah selanjutnya
        $('.pagination').find('.pageNumber.active').prev().
            removeClass('active'); // menghapus sebelumnya
    })
    $('.prev').click(function(){ // Untuk Tombol Prev
        $('.pagination').find('.pageNumber.active').prev().
            addClass('active'); // pindah selanjutnya
        $('.pagination').find('.pageNumber.active').next().
            removeClass('active'); // menghapus sebelumnya
    })
})