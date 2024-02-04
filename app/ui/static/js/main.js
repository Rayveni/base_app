function message_update(success, message) {
  document.querySelector('#message_id').textContent = message;
}

function get_input_values() {
  let fields_id = ['tentacles', 'name'];
  return Object.fromEntries(
    fields_id.map((field_id) => [
      field_id,
      document.getElementById(field_id).value,
    ])
  );
}
async function FileUpload(inp) {
  let input_values =  get_input_values();
  let formData = new FormData();
  let photo = inp.files[0];

  formData.append('file', photo);
  formData.append('report_params', JSON.stringify(input_values));

  //const ctrl = new AbortController()    // timeout setTimeout(() => ctrl.abort(), 5000);

  try {
    let r = await fetch('/upload', {
      method: 'POST',
      body: formData, //,signal: ctrl.signal
    });

    let _status = r.headers.get('status');

    if (r.headers.get('status') === 'true') {
      let response = await r.blob(); //.json();//text()

      const filename = r.headers.get('filename');

      const url = window.URL.createObjectURL(response);

      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // the filename you want
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      let response = await r.json();
      message_update(r.headers.get('status'), response['message']);
    }

    // window.URL.revokeObjectURL(url);
  } catch (e) {
    message_update(false, e);
  }
}
