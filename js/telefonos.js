var empresas = Array();
function setEmpresas(data) {
  empresas = data;
}
function getEmpresas(smin, smax) {
  smin = parseInt(smin);
  smax = parseInt(smax);
  results = {};
  results['isSet'] = false;
  for (empresa in empresas) {
    ranges = empresas[empresa];
    for (range in ranges) {
      rangemin = ranges[range][0];
      rangemax = ranges[range][1];
      if  (smin > rangemax)
	continue;
      else if (smax < rangemin) 
	break
      else {
	results['isSet'] = true;
	if (empresa in results)
	  results[empresa].push(ranges[range]);
	else {
	  results[empresa] = [];
	  results[empresa].push(ranges[range]);
	}
      }
    }
  }
  return results;
}
function genRangeHTML(tup) {
  range = results[empresa][tup];
  numeromin = range[0] + "";
  nirmin = numeromin.substring(0,3);
  sermin = numeromin.substring(3,6);
  finmin = numeromin.substring(6, 10);
  mintxt = nirmin + " " + sermin + " " + finmin;
  numeromax = range[1] + "";
  nirmax = numeromax.substring(0,3);
  sermax = numeromax.substring(3,6);
  finmax = numeromax.substring(6, 10);
  maxtxt = nirmax + " " + sermax + " " + finmax;
  return "del " + mintxt + " al " + maxtxt  + "<br />";
}

$(document).ready(function(){
    $('#formContainer :input').attr('disabled', true);
    $.getJSON('js/data.json', function(data) {
	setEmpresas(data);
	$('#formContainer :input').removeAttr('disabled');

      });
    $('#numeroInput1, #numeroInput2, #numeroInput3').keyup(function() {
	if (($('#numeroInput1').val().length > 1)) {
	  prefix =  $('#numeroInput1').val()+$('#numeroInput2').val()+$('#numeroInput3').val();
	  manyshort = 10 - prefix.length;
	  searchmin = prefix;
	  searchmax = prefix;
	  for (i=0; i<manyshort; i++) {
	    searchmin+='0';
	    searchmax+='9';
	  }
	  results = getEmpresas(searchmin,searchmax);
	  $('#razonres').html('');
	  if (!results['isSet']) {
	    $('#razonres').html('Rango no asignado');
	    return;
	  } else {
	    delete results['isSet'];
	  }
	  for (empresa in results) {
	    empresahtml = "<span class='empresa'>" + empresa + "</span><br />";
	    for (tup in results[empresa]) {
	      empresahtml += genRangeHTML(tup);
	    }
	    empresahtml += "<br />";
	    $('#razonres').append(empresahtml);
	  }
	}
	else
	  $('#razonres').html('');
      });
    $('#numeroInput1, #numeroInput2, #numeroInput3').autotab_magic().autotab_filter('numeric');
  });

