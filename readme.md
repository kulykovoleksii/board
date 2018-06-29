board  (Laravel)

docker-compose exec php-cli vendor/bin/phpunit


make docker-up
make docker-down
make perm // for permissions

https://localhost:8080
sudo chown $USER:$USER -R storage 


Image for service php-cli was built because it did not already exist. To rebuild this image you must use `docker-compose build` or `docker-compose up --build`.

docker-compose exec php-cli php artisan tinker 