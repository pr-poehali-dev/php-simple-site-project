import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const CATEGORIES = [
  { id: 'children', name: 'Мебель для детей', icon: '👶' },
  { id: 'kindergarten', name: 'Детские сады', icon: '🏫' },
  { id: 'school', name: 'Школы', icon: '📚' },
  { id: 'office', name: 'Офис', icon: '💼' },
  { id: 'sports', name: 'Спорт', icon: '⚽' },
  { id: 'household', name: 'Хоз. помещения', icon: '🧹' },
  { id: 'metal', name: 'Металлокаркас', icon: '🔩' },
];

const PRODUCTS = [
  { id: 1, name: 'Детская кровать "Солнышко"', price: 15990, category: 'children', image: '🛏️', desc: 'Удобная и безопасная кровать для детей от 3 лет' },
  { id: 2, name: 'Шкаф для игрушек', price: 12990, category: 'children', image: '🧸', desc: 'Вместительный шкаф с яркими ящиками' },
  { id: 3, name: 'Стол для детского сада', price: 8990, category: 'kindergarten', image: '🪑', desc: 'Прочный стол для занятий и творчества' },
  { id: 4, name: 'Парта школьная', price: 11990, category: 'school', image: '✏️', desc: 'Регулируемая парта для школьников' },
  { id: 5, name: 'Офисный стул "Комфорт"', price: 9990, category: 'office', image: '🪑', desc: 'Эргономичное кресло для офиса' },
  { id: 6, name: 'Спортивная скамья', price: 14990, category: 'sports', image: '🏋️', desc: 'Надежная скамья для тренировок' },
  { id: 7, name: 'Стеллаж металлический', price: 7990, category: 'household', image: '📦', desc: 'Прочный стеллаж для склада' },
  { id: 8, name: 'Шкаф на металлокаркасе', price: 18990, category: 'metal', image: '🗄️', desc: 'Современный металлический шкаф' },
  { id: 9, name: 'Детская парта "Умник"', price: 10990, category: 'children', image: '📝', desc: 'Растущая парта с регулировкой высоты' },
  { id: 10, name: 'Стул детский цветной', price: 3990, category: 'kindergarten', image: '🪑', desc: 'Яркий и удобный стульчик' },
  { id: 11, name: 'Доска маркерная школьная', price: 13990, category: 'school', image: '📋', desc: 'Большая магнитно-маркерная доска' },
  { id: 12, name: 'Офисный шкаф', price: 24990, category: 'office', image: '🗄️', desc: 'Вместительный шкаф для документов' },
];

const FAQS = [
  { q: 'Доставляете ли вы мебель?', a: 'Да, мы доставляем мебель по всей России. Стоимость доставки рассчитывается индивидуально.' },
  { q: 'Есть ли гарантия на продукцию?', a: 'На всю нашу мебель предоставляется гарантия от 12 до 24 месяцев в зависимости от типа изделия.' },
  { q: 'Можно ли заказать мебель по индивидуальным размерам?', a: 'Да, мы изготавливаем мебель на заказ по вашим размерам и пожеланиям.' },
  { q: 'Как оформить заказ?', a: 'Вы можете оформить заказ по телефону или заполнить форму обратной связи на сайте.' },
];

export default function Index() {
  const [cart, setCart] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success('Товар добавлен в корзину!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <span>+7 (800) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>info@mebel.ru</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Пн-Пт: 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🪑</div>
              <div>
                <h1 className="text-2xl font-bold text-primary">ВИЛЕНА</h1>
                <p className="text-xs text-muted-foreground">Мебельная компания</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'catalog', label: 'Каталог' },
                { id: 'about', label: 'О компании' },
                { id: 'services', label: 'Услуги' },
                { id: 'contact', label: 'Контакты' },
                { id: 'faq', label: 'Вопросы' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-foreground/70 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <Button variant="outline" className="relative border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">{cart.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <section id="home" className="bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Качественная мебель для <span className="text-primary">детей и организаций</span>
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Производим и поставляем мебель для детских садов, школ, офисов и спортивных учреждений
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть каталог <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'Award', label: 'Гарантия качества', value: '2 года' },
              { icon: 'Truck', label: 'Доставка', value: 'По всей РФ' },
              { icon: 'Settings', label: 'Производство', value: 'Собственное' },
              { icon: 'Users', label: 'Довольных клиентов', value: '5000+' },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <Icon name={stat.icon as any} size={48} className="mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Каталог продукции</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Мы производим качественную мебель для детских учреждений, школ, офисов и спортивных залов
          </p>

          <div className="mb-8">
            <div className="relative mb-6">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-primary' : 'bg-white'}
              >
                Все
              </Button>
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`${selectedCategory === cat.id ? 'bg-primary' : 'bg-white'} text-xs md:text-sm flex items-center gap-1`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden lg:inline">{cat.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border-border hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/50 py-12 text-center">
                    <div className="text-7xl">{product.image}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString()}₽
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => addToCart(product.id)}
                      >
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">О компании</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-8xl mb-6 text-center">🏭</div>
              </div>
              <div className="space-y-4">
                <p className="text-lg">
                  Мебельная компания <strong className="text-primary">"Вилена"</strong> специализируется на производстве 
                  качественной мебели для детских учреждений, школ, офисов и спортивных организаций.
                </p>
                <p className="text-muted-foreground">
                  Мы работаем на рынке более 15 лет и за это время завоевали доверие тысяч клиентов. 
                  Наша продукция отличается высоким качеством, надежностью и доступными ценами.
                </p>
                <p className="text-muted-foreground">
                  Вся мебель изготавливается из экологически чистых материалов и имеет необходимые сертификаты качества.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: 'Wrench', title: 'Производство на заказ', desc: 'Изготовим мебель по вашим размерам и чертежам' },
              { icon: 'Truck', title: 'Доставка и монтаж', desc: 'Доставим и соберем мебель на вашем объекте' },
              { icon: 'BadgeCheck', title: 'Гарантийное обслуживание', desc: 'Предоставляем гарантию до 2 лет на всю продукцию' },
            ].map((service) => (
              <Card key={service.title} className="bg-white text-center border-border hover:shadow-lg transition-shadow">
                <CardContent className="pt-10 pb-10">
                  <Icon name={service.icon as any} size={56} className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
            <Card className="bg-white border-border shadow-md">
              <CardContent className="pt-8 pb-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={24} className="text-primary mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Телефон</div>
                        <div className="text-muted-foreground">+7 (800) 123-45-67</div>
                        <div className="text-muted-foreground">+7 (495) 987-65-43</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={24} className="text-primary mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Email</div>
                        <div className="text-muted-foreground">info@mebel.ru</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={24} className="text-primary mt-1" />
                      <div>
                        <div className="font-semibold mb-1">Адрес</div>
                        <div className="text-muted-foreground">г. Москва, ул. Производственная, д. 15</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Input placeholder="Ваше имя" className="bg-white" />
                    <Input placeholder="Телефон" type="tel" className="bg-white" />
                    <Input placeholder="Email" type="email" className="bg-white" />
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Отправить заявку
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {FAQS.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-white border border-border px-6 rounded-lg shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🪑</div>
                <div>
                  <div className="text-xl font-bold">ВИЛЕНА</div>
                  <div className="text-sm opacity-80">Мебельная компания</div>
                </div>
              </div>
              <p className="text-sm opacity-80">
                Качественная мебель для детских учреждений, школ и офисов с 2009 года
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm opacity-80">
                <div>+7 (800) 123-45-67</div>
                <div>info@mebel.ru</div>
                <div>Пн-Пт: 9:00-18:00</div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Разделы</h3>
              <div className="space-y-2 text-sm opacity-80">
                <div>Каталог продукции</div>
                <div>О компании</div>
                <div>Доставка и оплата</div>
                <div>Контакты</div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            © 2024 Мебельная компания "Вилена". Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
