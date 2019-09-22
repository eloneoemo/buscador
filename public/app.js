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
function init(){
      $.ajax({
        url: '/opciones',
        type: 'get',
        dataType: 'json'
    })
    .done(function(data) {
        if (!data.error) {
            $('#ciudad').append(renderSelect(data.ciudades));
            $('#tipo').append(renderSelect(data.tipos));
            $("#ciudad").material_select();
            $("#tipo").material_select();
        }
    });
};
init();
function renderSelect(data) { 
  var html = '';
  data.forEach(function(key, idx) {
      html += `<option value="${key}">${key}</option>`;
  });
  return html;
}
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
  function(){
    let url = '';
      if ($("#checkPersonalizada")[0].checked){
        let valores = $("#rangoPrecio").val();
        valores = valores.split(";");
        url = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
    } else {
        url = "http://localhost:3000/buscar";
    }
    $.ajax({
      type: 'get',
      url: url,
      dataType: 'json',
      success: function(data){
        $('.lista').html(mostrar(data.datos))  
      }
    })
  }
);

function mostrar(objeto) {
    var html = ''; 
    objeto.forEach(function(clave, index)
    {
        html += `<div class="card horizontal">
                    <div class="card-image">
                        <img src="http://localhost:3000/img/home.jpg">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content">
                            <div> <p><strong>Direccion: </strong>${ clave.Direccion }</p> </div>
                            <div> <p><strong>Ciudad: </strong>${ clave.Ciudad }</p> </div>
                            <div> <p><strong>Telefono: </strong>${ clave.Telefono }</p> </div>
                            <div> <p><strong>Código postal: </strong>${ clave.Codigo_Postal }</p> </div>
                            <div> <p><strong>Precio: </strong>${ clave.Precio }</p> </div>
                            <div> <p><strong>Tipo: </strong>${ clave.Tipo }</p> </div>
                        </div>
                    </div>
                </div>`;
    });
    return html;
}