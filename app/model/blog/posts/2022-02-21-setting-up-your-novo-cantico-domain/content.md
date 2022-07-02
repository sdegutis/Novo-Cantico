---
title: Setting up your Novo Cantico website
image: Photo by <a href="https://unsplash.com/@barkiple?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">John Barkiple</a> on <a href="https://unsplash.com/s/photos/wires?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

If you wanted to set up "example.com":

1. In EC2, launch new instance
   1. ami-0fb653ca2d3203ac1 (Ubuntu Server 20.04, 64-bit x86)
   2. Using t3.small level
   4. Set port 22 to my IP
   5. Add HTTP from Anywhere
   6. Add HTTPS from Anywhere
   7. Create a new key pair
   8. Set Name tag for your convenience
3. In Route53, link domain to new instance
   1. Create A record, pointed to IP
   2. Create CNAME record, pointed www to apex
4. Add SSH config
   1. Open `~/.ssh/config`
   2. Add:
      ```
      Host example.com
        User ubuntu
        IdentityFile path/to/novocantico.pem
      ```
5. Go into server and start setting it up
   1. `ssh example.com`
   2. `sudo apt update`
   3. `sudo apt install nginx`
   4. Add domain to nginx
      1. `sudo vim /etc/nginx/sites-enabled/default`
      2. Change `server_name _;` to `server_name www.example.com example.com;`
      3. Comment out `root` and `index` lines
   5. Add HTTPS support
      1. Follow directions on https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
      2. `sudo snap install core; sudo snap refresh core`
      3. `sudo snap install --classic certbot`
      4. `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
      5. `sudo certbot --nginx`
   6. Install NPM and Node.js
      1. Review contents of https://deb.nodesource.com/setup_17.x to your liking
      2. `curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -`
      3. `sudo apt-get install -y nodejs`
   7. Create SSH key and add to GitHub
      1. Follow instructions at https://docs.github.com/en/authentication/connecting-to-github-with-ssh
      2. Add key to https://github.com/settings/keys
   8. Add Node.js app
      1. `git clone git@github.com:sdegutis/Novo-Cantico.git app`
      2. `cd app`
      3. `echo 'BASE_URL=https://www.example.com/' > .env`
      4. `npm install`
      5. `npm run build`
      6. `node main.js` and notice output
      7. Quit out with Ctrl-C, that was just a test
   9. Make Node.js app stay always on via PM2
      1.  `cd app` if not still in there
      2. `sudo npm install pm2@latest -g`
      3. `pm2 start main.js`
      4. Make sure it's working
         1. `curl -i 'http://localhost:8080'`
      5. `pm2 startup`
         1. Follow instructions, e.g. `sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu`
         3. `pm2 save`
   10. Get it working from port 80
       1. `sudo vim /etc/nginx/sites-enabled/default`
       2. Replace contents of `location /` with:
          ```
          proxy_set_header   X-Forwarded-For $remote_addr;
          proxy_set_header   Host $http_host;
          proxy_pass         http://0.0.0.0:8080;
          ```
       3. `sudo service nginx restart`
       4. Test it out:
          1. `curl -i 'http://localhost:8080'`
          2. `curl -i https://www.example.com/`
6. Make local repo push to GitHub and site at same time
   1. Locally:
      1. `git remote set-url --add --push origin git@github.com:sdegutis/Novo-Cantico.git`
      2. `git remote set-url --add --push origin ubuntu@example.com:app`
   2. In remote server:
      1. `cd app`
      2. `git config --local receive.denyCurrentBranch updateInstead`
   3. Change body in `app/main.ts`
   4. Commit
   5. Push

Now you can:

1. Develop locally in VS Code with debugger (F5)
2. Make http://localhost:8080/ to your liking
3. Deploy by committing and pushing as normal
