export default {
    providers: [
      {
        domain: process.env.CLERK_AUTH_DOMAIN,
        applicationID: "convex",
      },
    ]
  };