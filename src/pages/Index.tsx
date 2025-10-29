import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const PRODUCTS = [
  { id: 1, name: 'Умные часы Pro', price: 24990, category: 'electronics', image: '⌚', rating: 4.8 },
  { id: 2, name: 'Беспроводные наушники', price: 8990, category: 'electronics', image: '🎧', rating: 4.9 },
  { id: 3, name: 'Кожаный рюкзак', price: 6990, category: 'accessories', image: '🎒', rating: 4.7 },
  { id: 4, name: 'Портативная колонка', price: 4990, category: 'electronics', image: '🔊', rating: 4.6 },
  { id: 5, name: 'Солнцезащитные очки', price: 3990, category: 'accessories', image: '🕶️', rating: 4.5 },
  { id: 6, name: 'Спортивная бутылка', price: 1490, category: 'accessories', image: '🧴', rating: 4.8 },
  { id: 7, name: 'Умная лампа RGB', price: 2990, category: 'electronics', image: '💡', rating: 4.7 },
  { id: 8, name: 'Кошелек из кожи', price: 2490, category: 'accessories', image: '👛', rating: 4.6 },
];

const FAQS = [
  { q: 'Какие способы оплаты вы принимаете?', a: 'Мы принимаем все основные банковские карты, электронные кошельки и оплату при получении.' },
  { q: 'Как долго доставка?', a: 'Доставка по Москве занимает 1-2 дня, по России 3-7 дней.' },
  { q: 'Есть ли гарантия на товары?', a: 'Да, на все товары предоставляется официальная гарантия от производителя.' },
  { q: 'Можно ли вернуть товар?', a: 'Да, вы можете вернуть товар в течение 14 дней с момента получения.' },
];

export default function Index() {
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success('Товар добавлен в корзину!');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🚀</div>
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">ModernShop</h1>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['home', 'products', 'about', 'services', 'contact', 'faq'].map((section) => (
                <button
                  key={section}
                  onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-foreground/80 hover:text-foreground transition-colors capitalize"
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'products' ? 'Товары' : 
                   section === 'about' ? 'О нас' : 
                   section === 'services' ? 'Услуги' : 
                   section === 'contact' ? 'Контакты' : 'FAQ'}
                </button>
              ))}
            </nav>

            <Button className="gradient-primary relative">
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-secondary">{cart.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Будущее <span className="gradient-primary bg-clip-text text-transparent">онлайн</span> покупок
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Откройте для себя уникальные товары с доставкой по всей России
            </p>
            <Button 
              size="lg" 
              className="gradient-primary text-lg px-8"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Начать покупки <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in">Каталог товаров</h2>
          
          <div className="mb-8 space-y-6 animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
              
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="glass grid grid-cols-3 w-full">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="electronics">Электроника</TabsTrigger>
                  <TabsTrigger value="accessories">Аксессуары</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card className="glass">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Цена: {priceRange[0]}₽ - {priceRange[1]}₽</label>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="glass"
                      placeholder="От"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="glass"
                      placeholder="До"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="glass overflow-hidden hover:scale-105 transition-transform duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm text-foreground/70">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                      {product.price}₽
                    </span>
                    <Button 
                      size="sm" 
                      className="gradient-primary"
                      onClick={() => addToCart(product.id)}
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-foreground/70 mb-8">
              ModernShop — это современная платформа для онлайн-шопинга, где вы найдете только качественные 
              товары от проверенных производителей. Мы работаем с 2024 года и уже помогли тысячам клиентов 
              найти идеальные товары.
            </p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { icon: 'Package', label: 'Довольных клиентов', value: '10 000+' },
                { icon: 'Users', label: 'Товаров в каталоге', value: '50 000+' },
                { icon: 'Star', label: 'Средний рейтинг', value: '4.8' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <Icon name={stat.icon as any} size={40} className="mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'Truck', title: 'Быстрая доставка', desc: 'Доставим ваш заказ в кратчайшие сроки' },
              { icon: 'ShieldCheck', title: 'Гарантия качества', desc: 'Все товары сертифицированы' },
              { icon: 'Headphones', title: 'Поддержка 24/7', desc: 'Всегда готовы помочь вам' },
            ].map((service) => (
              <Card key={service.title} className="glass text-center hover:scale-105 transition-transform">
                <CardContent className="pt-8 pb-8">
                  <Icon name={service.icon as any} size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                  <p className="text-foreground/70">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
            <Card className="glass">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>info@modernshop.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>г. Москва, ул. Примерная, д. 1</span>
                </div>
                <div className="pt-4">
                  <Input placeholder="Ваше имя" className="mb-3 glass" />
                  <Input placeholder="Email" type="email" className="mb-3 glass" />
                  <Input placeholder="Сообщение" className="mb-4 glass" />
                  <Button className="w-full gradient-primary">Отправить</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Вопросы и ответы</h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass border-border px-6 rounded-lg">
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/70">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-2xl">🚀</div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">ModernShop</span>
          </div>
          <p className="text-foreground/70">© 2024 ModernShop. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
