using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NationalInstruments;
using NationalInstruments.DAQmx;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace fyrpSol
{
  [Route("api/[controller]")]
  [ApiController]
  public class BackwardController : Controller
  {
    // GET: /<controller>/
    [HttpPost]
    public void Post()
    {
      double Voltagevalue0, Voltagevalue1;

      Voltagevalue0 = 2.24;
      Voltagevalue1 = 2.5;

      NationalInstruments.DAQmx.Task analogOut0 = new NationalInstruments.DAQmx.Task();
      NationalInstruments.DAQmx.Task analogOut1 = new NationalInstruments.DAQmx.Task();

      AOChannel ChanelAO0, ChanelAO1;

      ChanelAO0 = analogOut0.AOChannels.CreateVoltageChannel("dev2/ao0", "ChanelAO0", 0, 5, AOVoltageUnits.Volts);
      ChanelAO1 = analogOut1.AOChannels.CreateVoltageChannel("dev2/ao1", "ChanelAO1", 0, 5, AOVoltageUnits.Volts);

      AnalogSingleChannelWriter writer0 = new AnalogSingleChannelWriter(analogOut0.Stream);

      writer0.WriteSingleSample(true, Voltagevalue0);


      AnalogSingleChannelWriter writer1 = new AnalogSingleChannelWriter(analogOut1.Stream);

      writer1.WriteSingleSample(true, Voltagevalue1);
    }
  }
}
