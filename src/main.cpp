#include <Arduino.h>

#include "WiFiManager.h"
#include "webServer.h"
#include "configManager.h"

void setup() 
{
    Serial.begin(115200);

    GUI.begin();
    configManager.begin();
    WiFiManager.begin(configManager.data.projectName);

    Serial.println("Hello world");
}

void loop() 
{
    //software interrupts
    WiFiManager.loop();

    //your code here
}
