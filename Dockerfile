FROM php:8.3.8-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    poppler-utils \
    python3\
    python3-pip

# RUN pip install mammoth pdf2docx html2pdf bs4 pandas requests openpyxl

RUN apt-get update && \
     apt-get install -y \
         libzip-dev \
         && docker-php-ext-install zip
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
EXPOSE 9000
WORKDIR /var/www
RUN chown -R www-data:www-data /var/www
# RUN php --ini
# CMD ["php","artisan","serve","--host","0.0.0.0"]
CMD ["php-fpm"]
