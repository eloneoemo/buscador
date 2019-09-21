//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

$('#buscar').click(
  $.ajax({
    type: 'get',
    url: '/buscar',
    dataType: 'json',
    success: function(data){
     mostrar(data.datos)
    }
  }));

  function mostrar(objArr) {
    var html = '';
    
    objArr.forEach(function(key, idx)
    {
        html += `<div class="card horizontal">
                <div class="card-image">
                    <img src="http://localhost:3000/img/home.jpg">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div> <p><strong>Direccion: </strong>${ key.Direccion }</p> </div>
                        <div> <p><strong>Ciudad: </strong>${ key.Ciudad }</p> </div>
                        <div> <p><strong>Telefono: </strong>${ key.Telefono }</p> </div>
                        <div> <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p> </div>
                        <div> <p><strong>Precio: </strong>${ key.Precio }</p> </div>
                        <div> <p><strong>Tipo: </strong>${ key.Tipo }</p> </div>
                    </div>
                </div>
            </div>`;
    });
    return html;
} // .renderCard