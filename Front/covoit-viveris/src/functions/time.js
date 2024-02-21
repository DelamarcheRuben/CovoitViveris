export class Time {
    hours = 0;
    minutes = 0;
    constructor(hours, min) {
      this.hours = hours;
      while(min>0)
        {
            if(min>59) this.hours++;
            else 
            {
                this.minutes+=min;
                if(this.minutes>59)
                {
                    this.minutes = this.minutes%60;
                    this.hours++;
                }
                
            }
            min-=60;
        }
    }

    addMinutes(min)
    {
        while(min>0)
        {
            if(min>59) this.hours++;
            else 
            {
                this.minutes+=min;
                if(this.minutes>59)
                {
                    this.minutes = this.minutes%60;
                    this.hours++;
                }
                
            }
            min-=60;
        }
    }

    getTotalMinutes()
    {
        return 60*this.hours+this.minutes;
    }

    toString()
    {
        var res="";
        if(this.hours<10) res+="0";
        res+=this.hours+":";
        if(this.minutes<10) res+="0";
        res+=this.minutes;
        return res;
    }
}
  