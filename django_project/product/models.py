from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
    def get_absolute_url(self):
        return f'/{self.slug}/'

class Product(models.Model):
    category =models.ForeignKey(Category, related_name="products", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='upload/', blank=True, null=True)
    date_added = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('date_added',)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/product/{self.slug}/'

    def get_image(self):
        # if self.image:
        #     return 'http://127.0.0.1:8000' + self.image.url
        return '/image/not-found.jpg'



