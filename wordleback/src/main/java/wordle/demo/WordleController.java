package wordle.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wordle")
public class WordleController {

    @Autowired
    private Aplicacion aplicacion;

    @GetMapping("/palabra")
    @ResponseBody
    public String getPalabra() {
        return aplicacion.getPalabra();
    }

    @PostMapping("/verificar")
    @ResponseBody
    public List<ColorLetra> verificar(@RequestParam String letra1, @RequestParam String letra2, @RequestParam String letra3,
                                      @RequestParam String letra4, @RequestParam String letra5) {
        return aplicacion.verificar(letra1, letra2, letra3, letra4, letra5);
    }

    @GetMapping("/gano")
    @ResponseBody
    public boolean getGano() {
        return aplicacion.getGano();
    }
}
