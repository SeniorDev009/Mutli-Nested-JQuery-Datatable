function format(d){
    // `d` is the original data object for the row
    var str = '';
    str += '<div style="padding-left:100px;">'
    str += '<a class="btn btn-outline-secondary btn-sm addNote">Add New Note</a>';
    str += '<table class="display" width="100%;" style="margin-bottom:8px; margin-top:8px">' +
                '<thead>'+
                    '<tr>'+
                        '<th>Note Title</th>'+
                        '<th>Note Content</th>'+
                        '<th>Logged By</th>'+
                        '<th>Time Logged</th>'+
                        '<th>Edited By</th>'+
                        '<th>Time Edited</th>'+
                        '<th>Actions</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';
            for (let i = 0; i < d.EventNotes.length; i++) {
                const element = d.EventNotes[i];
                var EditedByName = (element.EditedByName == null)?"":element.EditedByName;
                var EditedTimestamp = (element.EditedTimestamp == null)?"":element.EditedTimestamp;
                str += '<tr>';
                str += '<td>' + element.NoteTitle + '</td>';
                str += '<td>' + element.NoteContent + '</td>';
                str += '<td>' + element.FullName + '</td>';
                str += '<td>' + element.NoteTimestamp + '</td>';
                str += '<td>' + EditedByName + '</td>';
                str += '<td>' + EditedTimestamp + '</td>';
                str += '<td>' + '<a class="editNote" id="'+i+'" style="cursor:pointer">Edit</a>' + '</td>';
                str += '</tr>';
            }
    str +=  '</tbody>'+
    '</table>';  
    str += '<a class="btn btn-outline-secondary btn-sm uploadFile">Upload File</a>';
    str += '<table class="display" width="100%;" style="margin-top:8px">' +
                '<thead>'+
                    '<tr>'+
                        '<th>File Name</th>'+
                        '<th>Uploaded By</th>'+
                        '<th>Time Uploaded</th>'+
                        '<th>Edited By</th>'+
                        '<th>Time Edited</th>'+
                        '<th>Actions</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';
            for (let i = 0; i < d.EventFiles.length; i++) {
                const element = d.EventFiles[i];
                var EditedByName = (element.EditedByName == null)?"":element.EditedByName;
                var EditedTimestamp = (element.EditedTimestamp == null)?"":element.EditedTimestamp;
                str += '<tr>';
                str += '<td>' + element.FileName + '</td>';
                str += '<td>' + element.FullName + '</td>';
                str += '<td>' + element.UploadedTimestamp + '</td>';
                str += '<td>' + EditedByName + '</td>';
                str += '<td>' + EditedTimestamp + '</td>';
                str += '<td>' + '<a id="' + i + '" class="editFile" style="cursor:pointer">Edit</a><br/><a class="downloadFile" filepath="' + element.FileURL + '" style="cursor:pointer">Download</a>' + '</td>';
                str += '</tr>';
            }
    str +=  '</tbody>'+
    '</table>'; 
    str += '</div>';
    return str;
}
$(document).ready(function () {
 
  fetch('./ajax/data/sampledata.json', {
    mode: 'cors',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'X-Requested-With',
    }
  })
  .then(response => response.json())
  .then(response => {
      var table = $('#example').DataTable({
        "data": response,
        select:"single",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
                "render": function (data, type, full, meta ) {
                    return '<i class="fa fa-plus-square" aria-hidden="true" id="'+meta.row+'" eventId="'+data.EventLogId+'"></i>';
                },
                width:"15px"
            },
            { "data": "EventCode" },
            { "data": "EventTitle" },
            { "data": "FullName" },
            { "data": "Timestamp" },
        ],
        "order": [[1, 'asc']]
      });
      // Add event listener for opening and closing details
      $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var tdi = tr.find("i.fa");
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            tdi.first().removeClass('fa-minus-square');
            tdi.first().addClass('fa-plus-square');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
            tdi.first().removeClass('fa-plus-square');
            tdi.first().addClass('fa-minus-square');
        }
    });
    table.on("user-select", function (e, dt, type, cell, originalEvent) {
      if ($(cell.node()).hasClass("details-control")) {
          e.preventDefault();
      }
    });
    // handle Note
    $('#example tbody').on('click', 'a.addNote', function () {
      $("#addNoteModal").find(".eventID").val($(this).parent().parent().parent("tr").prev().find("i").attr("eventId"));
      $("#addNoteModal").find(".p_order").val($(this).parent().parent().parent("tr").prev().find("i").attr("id"));
      $("#addNoteModal").modal();
    });
    $('#example tbody').on('click', 'a.editNote', function () {
      $("#editNoteModal").find("#noteName").val($(this).parent().parent("tr").find("td").eq(0).text());
      $("#editNoteModal").find("#noteContent").val($(this).parent().parent("tr").find("td").eq(1).text());
      $("#editNoteModal").find(".p_order").val($(this).parent().parent("tr").parent().parent("table").parent().parent().parent("tr").prev().find("i").attr("id"));
      $("#editNoteModal").find(".order").val($(this).attr("id"));
      $("#editNoteModal").modal();
    });
    // handle File
    $('#example tbody').on('click', 'a.uploadFile', function () {
      $("#uploadFileModal").find(".eventID").val($(this).parent().parent().parent("tr").prev().find("i").attr("eventId"));
      $("#uploadFileModal").find(".p_order").val($(this).parent().parent().parent("tr").prev().find("i").attr("id"));
      $("#uploadFileModal").modal();
    });
    $('#example tbody').on('click', 'a.editFile', function () {
      $("#editFileModal").find("#fileName").val($(this).parent().parent("tr").find("td").eq(0).text());
      $("#editFileModal").find(".order").val($(this).attr("id"));
      $("#editFileModal").find(".p_order").val($(this).parent().parent("tr").parent().parent("table").parent().parent().parent("tr").prev().find("i").attr("id"));
      $("#editFileModal").modal();
    });
    // download file
    $('#example tbody').on('click', 'a.downloadFile', function () {
        var file = $(this).attr("filepath");
        if(file == "null") {
          alert("there is not a file")
        } else {
          var getUrl = window.location;
          var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
          var path = baseUrl + file;
          var link = document.createElement("a");
          link.setAttribute("href", path);
                link.setAttribute("download", 'filename');
                link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        }
    });
  })
  .catch(error => console.log('Response failed : ' + error.message));
  
    
    
});

