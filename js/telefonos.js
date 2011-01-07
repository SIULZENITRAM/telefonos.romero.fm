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
      if ((smax < rangemin) || (smin > rangemax))
	continue;
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
$(document).ready(function(){
    $.getJSON('js/data.json', function(data) {
	setEmpresas(data);
      });
    $('#numeroInput1, #numeroInput2, #numeroInput3').keyup(function() {
	if (($('#numeroInput1').val().length > 2)) {
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
	      numeromin = results[empresa][tup][0] + "";
	      nirmin = numeromin.substring(0,3);
	      sermin = numeromin.substring(3,6);
	      finmin = numeromin.substring(6, 10);
	      mintxt = nirmin + " " + sermin + " " + finmin;
	      numeromax = results[empresa][tup][1] + "";
	      nirmax = numeromax.substring(0,3);
	      sermax = numeromax.substring(3,6);
	      finmax = numeromax.substring(6, 10);
	      maxtxt = nirmax + " " + sermax + " " + finmax;
	      empresahtml += "del " + mintxt + " al " + maxtxt  + "<br />";
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

