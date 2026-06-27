import {
  ShieldCheck,
  Gavel,
  ShoppingBag,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <Gavel size={28} className="text-primary" />,
    title: "Transparent Bidding",
    description:
      "Our real-time bidding system ensures every transaction is fair, competitive, and transparent.",
  },
  {
    icon: <ShieldCheck size={28} className="text-primary" />,
    title: "Trusted Marketplace",
    description:
      "We provide a secure environment where buyers and sellers can trade with confidence.",
  },
  {
    icon: <ShoppingBag size={28} className="text-primary" />,
    title: "Smart Shopping",
    description:
      "Discover quality products, compare offers, and make informed purchasing decisions.",
  },
];

const stats = [
  {
    value: "1000+",
    label: "Products Listed",
  },
  {
    value: "500+",
    label: "Active Users",
  },
  {
    value: "300+",
    label: "Successful Deals",
  },
  {
    value: "99%",
    label: "Customer Satisfaction",
  },
];

const AboutUs = () => {
  return (
    <main className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}

        <div className="max-w-3xl mx-auto text-center mb-20">

          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            About SmartDeals
          </span>

          <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            A Smarter Way to
            <span className="text-primary">
              {" "}Buy & Sell
            </span>
          </h1>

          <p className="mt-6 text-lg text-base-content/70 leading-8">
            SmartDeals is a modern online marketplace connecting buyers
            and sellers through a secure and transparent bidding system.
            We help users discover great products, compete fairly,
            and make smarter purchasing decisions.
          </p>

        </div>

        {/* Mission */}

        <section className="grid lg:grid-cols-2 gap-14 items-center">

          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200"
              alt="SmartDeals Marketplace"
              className="w-full h-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div>

            <span className="text-primary font-semibold uppercase tracking-wide">
              Our Mission
            </span>

            <h2 className="mt-3 text-4xl font-bold">
              Building Trust Through
              <span className="text-primary">
                {" "}Innovation
              </span>
            </h2>

            <p className="mt-6 text-base-content/70 leading-8">
              Our mission is to create a secure, user-friendly, and
              transparent marketplace where buyers can discover the best
              deals and sellers can maximize the value of their products
              through competitive bidding.
            </p>

            <div className="mt-10 space-y-5">

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mt-1">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-base-content/70">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          </div>

        </section>

        {/* Stats */}

        <section className="mt-24">

          <div className="text-center mb-12">

            <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
              Our Growth
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              SmartDeals by the Numbers
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Users
                  className="mx-auto mb-4 text-primary"
                  size={30}
                />

                <h3 className="text-4xl font-bold text-primary">
                  {item.value}
                </h3>

                <p className="mt-3 text-base-content/70">
                  {item.label}
                </p>
              </div>
            ))}

          </div>

        </section>

      </div>
    </main>
  );
};

export default AboutUs;