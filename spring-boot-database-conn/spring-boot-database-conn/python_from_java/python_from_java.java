import java.io.IOException;

public class python_from_java {
    public void python_from_java throws IOException {
        Runtime rt = Runtime.getRuntime();
        Process pr = rt.exec("python main.py");
    }
}
