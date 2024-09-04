class wordleService {
  static async postVerify(intentoActual) {
    try {
      return await fetch(
        "http://localhost:8080/wordle/verificar?letra1=A&letra2=R&letra3=D&letra4=R&letra5=B",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Error en la red");
          }
          return await response.json();
        })
        .then((data) => {
          return data;
        });
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}

export default wordleService;
