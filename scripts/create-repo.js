const { spawn } = require('child_process');

const proc = spawn('git', ['credential', 'fill']);
let out = '';
proc.stdout.on('data', d => out += d.toString());
proc.on('close', async () => {
  const lines = out.split('\n');
  let username = '', password = '';
  for (const l of lines) {
    if (l.startsWith('username=')) username = l.slice(9).trim();
    if (l.startsWith('password=')) password = l.slice(9).trim();
  }
  console.log('Username:', username);

  const res = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': 'token ' + password,
      'Content-Type': 'application/json',
      'User-Agent': 'QAZMARKET'
    },
    body: JSON.stringify({
      name: 'qazmarket',
      description: 'QAZMARKET — Қазақ тіліндегі маркетинг зертханасы (EdTech платформа, 10-сынып)',
      private: false,
      auto_init: false
    })
  });
  const data = await res.json();
  console.log('Status:', res.status);
  if (res.status === 201) {
    console.log('REPO_CREATED:', data.html_url);
    console.log('CLONE_URL:', data.clone_url);
  } else if (res.status === 422 && JSON.stringify(data).includes('already exists')) {
    console.log('REPO_EXISTS: https://github.com/' + username + '/qazmarket');
  } else {
    console.log('Response:', JSON.stringify(data));
  }
});
proc.stdin.write('protocol=https\nhost=github.com\n\n');
