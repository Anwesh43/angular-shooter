var reset,submit;
var numWidth,numMotherWidth;
var needsReset = false;
var labels = [];
var motherWidths = [];
var widths = [];
var comboParams = [];
var comboMins = [];
var m,n;
var fieldBox;
var totalWidthFields = [];
var brs = [];
var strs = [];
var val = 0;
window.onload = function(){
	numWidth = document.getElementById('numberOfWidth');
	numMotherWidth = document.getElementById('numberOfMotherWidth');
	reset = document.getElementById('reset');
	createTextBoxes = document.getElementById('createTextBoxes');
	fieldBox = document.getElementById('form-field-box');
	reset.onclick = function() {
		if(needsReset) {
			removeElements(labels);
			removeElements(totalWidthFields);
			removeElements(brs);
			widths = [];
			motherWidths = [];
			labels = [];
			totalWidthFields = [];
			brs = [];
			strs = [];
			comboParams = [];
			comboMins = [];
			needsReset = false;
			document.getElementById('result-box').innerHTML = "";
			reset.disabled = true;
			disableFields([numWidth,numMotherWidth],false);
			disableFields(totalWidthFields,false);
		}	
	};
	submit = document.getElementById('submit');
	submit.onclick = function() {
		if(!needsReset) {
			if(numWidth.value.trim()!='' && numMotherWidth.value.trim()!="") {
				m = numMotherWidth.value;
				n = numWidth.value
				createInputs(numMotherWidth.value,"motherWidth");
				createInputs(n,"width");
				needsReset = true;
				reset.disabled = false;
				disableFields([numWidth,numMotherWidth],true);		
			}
		}	
		else {
			getVals();
			disableFields(totalWidthFields,true);
			for(var i=0;i<motherWidths.length;i++) {
				hrsa = [];
				var hrs = [];
				val = motherWidths[i];
				var isMatched = minCombo(motherWidths[i],hrs,widths.length);
				 
			if(!isMatched) {
			console.log('failed');
			}
			}
			document.getElementById('result-box').innerHTML = strs.join('');
		}
	};
};

function createInputs(m,elementVal) {
	for(var i=0;i<m;i++) {
		var label = document.createElement('label');
		label.innerHTML = elementVal+(i+1);
		labels.push(label);
		var ti = document.createElement("input");
		ti.type = "number";
		ti.min= "1";
		ti.required = true;
		ti.id = elementVal+(i+1);
		totalWidthFields.push(ti);
		document.getElementById('form-field-box').appendChild(label);
		document.getElementById('form-field-box').appendChild(ti);
		var br1 = document.createElement('br'),br2 = document.createElement('br');
		document.getElementById('form-field-box').appendChild(br1);
		document.getElementById('form-field-box').appendChild(br2);
		brs.push(br1);
		brs.push(br2);
	}
}
function getVals() {
	for(var i=0;i<m;i++) {
		motherWidths.push(parseInt(document.getElementById('motherWidth'+(i+1)).value));
	}
	for(var i=0;i<n;i++) {
		widths.push(parseInt(document.getElementById('width'+(i+1)).value));
		
	}
	widths.sort();
}
function removeElements(elements) {
	for(var i=0;i<elements.length;i++) {
				fieldBox.removeChild(elements[i]);
		}
}
function minCombo(n,hrs,l) {
	var hrb = [];
	for(var i=0;i<hrs.length;i++) {
		hrb[i] = hrs[i];
	}
	if(l !=1) {

		if(n-widths[l-1]==0){
			hrs.push(widths[l-1]);
			console.log(hrs.join('+'));
			strs.push("<p>"+val+"="+hrs.join('+')+"</p>");
			return 1;
		}
	}
	else {
		if(n-widths[0] !=0){
			return 0;
		}
		else {
			hrs.push(widths[0]);
			console.log(hrs.join('+'));
			strs.push("<p>"+val+"="+hrs.join('+')+"</p>");
			return 1;
		}
	}

	hrb.push(widths[l-1]);
		/*if(hrs[0] == 500) {
		console.log(hrs+" "+n+" "+hrb+" "+(l-1));
	}*/
	//console.log(l+" "+n);
	//console.log(l,n);
	return minCombo(n-widths[l-1],hrb,l-1) + minCombo(n,hrs,l-1);
}
function disableFields(fields,toggle) {
	for(var i=0;i<fields.length;i++) {
		fields[i].disabled = toggle;
	}
}
