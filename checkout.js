(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                    Swal.fire(
                        'Dados atualizados!',
                        'Os dados da sua conta foram atualizados',
                        'success'
                    );
                }
                form.classList.add('was-validated')
            }, false)
        })
})()

$('.deliveryOption').click(function () {
    if (!$(this).hasClass('deliveryOptionActive')) {
        $(this).addClass('deliveryOptionActive');
        if (this.id === "homeDel"){
            $('#inShop').removeClass('deliveryOptionActive');
            $('.homeDelivery').removeClass('d-none');
            // form area
            $('.pickUp').addClass('d-none');
        } else {
            $('#homeDel').removeClass('deliveryOptionActive');
            $('.homeDelivery').addClass('d-none');
            // form area
            $('.pickUp').removeClass('d-none');
        }
    }
})

$('.paymentContainer').click(function (){
    let paymentContainers = document.getElementsByClassName('paymentContainer');
    for (const method of paymentContainers) {
        $(method).hasClass('activePayment') && $(method).removeClass('activePayment');
    }
    $(this).addClass('activePayment');
})

$('#finishOrder').click(function () {
    Swal.fire(
        'Pedido concluído!',
        'Agora iremos direcioná-lo para o portal de pagamento',
        'success'
    );
})