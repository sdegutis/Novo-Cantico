# Novo Cantico

*Rethinking web software from first principles.*

"Novo Cantico" is taken from the chorus of [Puer natus in Bethlehem](https://www.youtube.com/watch?v=A1k5YTmxIVc&t=2573s) and means "a new song". Software and music have many principles in common, and this software project aims to find a new harmony in software development by starting from first principles rather than conventional wisdom.


## Steps

1. In EC2, launched new instance
   1. ami-0fb653ca2d3203ac1 (Ubuntu Server 20.04, 64-bit x86)
   2. Using t3.small level
   4. Set port 22 to my IP
   5. Added HTTP from Anywhere
   6. Added HTTPS from Anywhere
   7. Created a new key pair
   8. Set Name tag for my convenience
3. In Route53, linked domain to new instance
   1. Created A record, pointed to IP
   2. Created CNAME record, pointed www to apex
4. Added SSH config
   1. Opened `~/.ssh/config`
   2. Added:
      ```
      Host novocantico.org
        User ubuntu
        IdentityFile path/to/novocantico.pem
      ```
5. Went into server to start setting it up
   1. `ssh novocantico.org`
   2. `sudo apt update`
   3. `sudo apt install nginx`
   4. Added domain to nginx
      1. `sudo vim /etc/nginx/sites-enabled/default`
      2. Changed `server_name _;` to `server_name www.novocantico.org novocantico.org;`
   5. Added HTTPS support
      1. Followed directions on https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
      2. `sudo snap install core; sudo snap refresh core`
      3. `sudo snap install --classic certbot`
      4. `sudo ln -s /snap/bin/certbot /usr/bin/certbot`
      5. `sudo certbot --nginx`
   6. Added Node.js app

## License

MIT (see [LICENSE](LICENSE))
