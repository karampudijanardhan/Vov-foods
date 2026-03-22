import { motion } from "framer-motion";

const Offers = () => {

  return (
    <div className="min-h-screen bg-background">

      {/* HERO SECTION */}

      <section className="gradient-hero py-16 text-primary-foreground">
        <div className="container text-center space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl font-extrabold"
          >
            🌍{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              World Pickle Day
            </span>
          </motion.h1>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block bg-white/20 backdrop-blur-md px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
          >
            Celebrated Every Year — November 14
          </motion.div>

          <p className="opacity-90 max-w-xl mx-auto text-lg">
            A special day dedicated to the love of traditional homemade pickles.
            Get ready for exciting festival offers and delicious flavors!
          </p>

        </div>
      </section>


      {/* NO OFFERS MESSAGE */}

      <section className="container py-24 text-center">

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-primary mb-4"
        >
          🎉 No Offers Available Right Now
        </motion.h2>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          We are preparing special festival deals for upcoming celebrations like
          <span className="font-semibold"> World Pickle Day </span>
          and seasonal events. Please check back soon!
        </p>

      </section>

    </div>
  );
};

export default Offers;