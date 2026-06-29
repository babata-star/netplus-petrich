import { PrismaClient, Role, RequestType, TicketCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Seed скрипт — създава:
 *  1. Админ потребител (за тест на портала/админ панела)
 *  2. Демо клиент
 *  3. Първоначални новини
 *  4. Няколко примерни заявки и сигнала
 */
async function main() {
  console.log("🌱 Seeding database...");

  // Хеширане на пароли
  const adminPass = await bcrypt.hash("admin123", 12);
  const clientPass = await bcrypt.hash("client123", 12);

  // 1. Админ
  const admin = await prisma.user.upsert({
    where: { email: "admin@netplus-petrich.bg" },
    update: {},
    create: {
      name: "Администратор",
      email: "admin@netplus-petrich.bg",
      phone: "+359 88 000 0001",
      address: "гр. Петрич, ул. Централна 1",
      password: adminPass,
      role: Role.ADMIN,
    },
  });
  console.log(`  ✓ Admin: ${admin.email} (admin123)`);

  // 2. Демо клиент
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      name: "Иван Петров",
      email: "client@example.com",
      phone: "+359 88 123 4567",
      address: "гр. Петрич, ул. Гоце Делчев 15",
      password: clientPass,
      role: Role.CLIENT,
    },
  });
  console.log(`  ✓ Client: ${client.email} (client123)`);

  // 3. Новини
  const news = [
    {
      slug: "upgrede-mrezhata-2026",
      category: "Мрежа",
      titleBg: "Обновихме ядрото на мрежата — още по-бързо рутиране",
      titleEn: "We upgraded our network core — even faster routing",
      excerptBg:
        "Инвестирахме в нови маршрутизатори в централния възел, което намалява латентността и повишава стабилността за всички клиенти.",
      excerptEn:
        "We invested in new routers in our central node, reducing latency and improving stability for all customers.",
      contentBg:
        "Инвестирахме в нови маршрутизатори в централния възел, което намалява латентността и повишава стабилността за всички клиенти. Обновяването приключи успешно и вече виждаме подобрени показатели във всички направления на мрежата.",
      contentEn:
        "We invested in new routers in our central node, reducing latency and improving stability for all customers. The upgrade completed successfully and we now see improved metrics across all parts of the network.",
    },
    {
      slug: "promo-leto-2026",
      category: "Промоция",
      titleBg: "Лятна промоция: първи месец безплатно за нови клиенти",
      titleEn: "Summer promo: first month free for new customers",
      excerptBg:
        "До края на юли всички нови абонати за оптичен интернет получават първия месец безплатно и без такса активация.",
      excerptEn:
        "Until the end of July, all new fiber internet subscribers get the first month free with no activation fee.",
      contentBg:
        "До края на юли всички нови абонати за оптичен интернет получават първия месец безплатно и без такса активация. Не се колебайте да се свържете с нас за проверка на покритието на вашия адрес.",
      contentEn:
        "Until the end of July, all new fiber internet subscribers get the first month free with no activation fee. Feel free to contact us to check coverage at your address.",
    },
    {
      slug: "planned-maintenance-july",
      category: "Поддръжка",
      titleBg: "Планова поддръжка на 5 юли (02:00–04:00 ч.)",
      titleEn: "Planned maintenance on July 5 (02:00–04:00)",
      excerptBg:
        "Ще проведем кратка плановата поддръжка на инфраструктурата. Възможни са кратки прекъсвания в посочения прозорец.",
      excerptEn:
        "We'll conduct brief planned infrastructure maintenance. Brief interruptions are possible in the stated window.",
      contentBg:
        "Ще проведем кратка плановата поддръжка на инфраструктурата на 5 юли между 02:00 и 04:00 ч. Възможни са кратки прекъсвания на услугите в този прозорец. Благодаря ви за разбирането.",
      contentEn:
        "We'll conduct brief planned infrastructure maintenance on July 5 between 02:00 and 04:00. Brief service interruptions are possible during this window. Thank you for your understanding.",
    },
  ];

  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {},
      create: n,
    });
  }
  console.log(`  ✓ News: ${news.length} articles`);

  // 4. Примерни заявки и сигнали (за демо клиента)
  await prisma.serviceRequest.create({
    data: {
      userId: client.id,
      name: client.name || "Иван Петров",
      phone: client.phone || "",
      email: client.email,
      address: client.address || "",
      type: RequestType.GPON,
      status: "DONE",
      notes: "Инсталиран GPON 300/300",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  });
  await prisma.serviceRequest.create({
    data: {
      userId: client.id,
      name: client.name || "Иван Петров",
      phone: client.phone || "",
      email: client.email,
      address: client.address || "",
      type: RequestType.UPGRADE,
      status: "NEW",
      notes: "Искам ъпгрейд до 1000/1000",
    },
  });

  await prisma.supportTicket.create({
    data: {
      userId: client.id,
      category: TicketCategory.INTERNET,
      priority: "MEDIUM",
      subject: "Кратки прекъсвания вечер",
      description:
        "През последните дни забелязвам кратки прекъсвания на интернет вечерта около 21:00.",
      status: "RESOLVED",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
  });

  // 5. Отзив
  await prisma.feedback.create({
    data: {
      userId: client.id,
      name: client.name || "Иван Петров",
      rating: 5,
      comment:
        "Най-стабилният интернет в Петрич. Поддръжката е бърза и на човешки език.",
      approved: true,
    },
  });

  console.log("✅ Seed completed!");
  console.log("   Admin login:  admin@netplus-petrich.bg / admin123");
  console.log("   Client login: client@example.com / client123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
