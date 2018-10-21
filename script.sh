tar -czf - ./ | openssl enc -e -aes-256-cbc -out deploy.tar.enc -k "lkasmdflmcxlvkad23r9xcXZlxkcjask12222sdjlkasd127hhzjka1aslk"
mv deploy.tar.enc ../
echo 'moved deploy.tar.enc to bundle folder'

